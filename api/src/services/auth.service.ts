import prisma from "../config/prisma";
import CodeType from "../constants/code.type";
import { APP_ORIGIN } from "../constants/env";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../constants/http";
import appAssert from "../utils/app.assert";
import { compareValue, hashValue } from "../utils/bcrypt";
import {
  fiveMinutesAgo,
  ONE_DAY_MS,
  oneHourFromNow,
  oneYearFromNow,
  thirtyDaysFromNow,
} from "../utils/date";
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from "../utils/email.templates";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../utils/jwt";
import { sendMail } from "../utils/send.mail";

export type CreateAccountParams = {
  name: string;
  username: string;
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  const existingUsername = await prisma.user.findUnique({
    where: { username: data.username },
  });
  appAssert(!existingUsername, CONFLICT, "Username already in use");

  const existingEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });
  appAssert(!existingEmail, CONFLICT, "Email already in use");

  const hashedPassword = await hashValue(data.password);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      password: hashedPassword,
    },
  });

  const verificationCode = await prisma.code.create({
    data: {
      userId: user.id,
      type: CodeType.EmailVerification,
      expiresAt: oneYearFromNow(),
    },
  });

  const url = `${APP_ORIGIN}/email/verify/${verificationCode.id}`;

  const { error } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });

  if (error) console.log(error);

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent: data.userAgent,
      expiresAt: thirtyDaysFromNow(),
    },
  });

  const refreshToken = signToken(
    {
      sessionId: session.id,
    },
    refreshTokenSignOptions
  );

  const accessToken = signToken({
    userId: user.id,
    sessionId: session.id,
  });

  return {
    user: { ...user, password: undefined },
    accessToken,
    refreshToken,
  };
};

export type LoginUserParams = {
  usernameOrEmail: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async (data: LoginUserParams) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: data.usernameOrEmail }, { email: data.usernameOrEmail }],
    },
  });
  appAssert(user, UNAUTHORIZED, "Invalid credentials");

  const isValid = await compareValue(data.password, user.password);
  appAssert(isValid, UNAUTHORIZED, "Invalid credentials");

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      userAgent: data.userAgent,
      expiresAt: thirtyDaysFromNow(),
    },
  });

  const refreshToken = signToken(
    {
      sessionId: session.id,
    },
    refreshTokenSignOptions
  );

  const accessToken = signToken({
    userId: user.id,
    sessionId: session.id,
  });

  return {
    user: { ...user, password: undefined },
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await prisma.session.findUnique({
    where: { id: payload.sessionId },
  });
  const now = Date.now();
  appAssert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    "Session expired"
  );

  const sessionNeedRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;

  if (sessionNeedRefresh) {
    await prisma.session.update({
      where: { id: session.id },
      data: { expiresAt: thirtyDaysFromNow() },
    });
  }

  const newRefreshToken = sessionNeedRefresh
    ? signToken({ sessionId: session.id }, refreshTokenSignOptions)
    : undefined;

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session.id,
  });

  return {
    accessToken,
    newRefreshToken,
  };
};

export const verifyEmail = async (code: string) => {
  const validCode = await prisma.code.findUnique({
    where: {
      id: code,
      type: CodeType.EmailVerification,
    },
    include: {
      user: true,
    },
  });
  appAssert(
    validCode && validCode.expiresAt > new Date(),
    UNAUTHORIZED,
    "Invalid or expired verification code"
  );

  const updatedUser = await prisma.user.update({
    where: { id: validCode.userId },
    data: { verified: true },
  });
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to verify email");

  await prisma.code.delete({
    where: { id: validCode.id },
  });

  return {
    user: { ...updatedUser, password: undefined },
  };
};

export const sendPasswordResetEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  appAssert(user, UNAUTHORIZED, "User not found");

  const fiveMinAgo = fiveMinutesAgo();

  const count = await prisma.code.count({
    where: {
      userId: user.id,
      type: CodeType.PasswordReset,
      expiresAt: { gt: fiveMinAgo },
    },
  });
  appAssert(
    count < 1,
    TOO_MANY_REQUESTS,
    "Too many requests, please try again later"
  );

  const expiresAt = oneHourFromNow();
  const verificationCode = await prisma.code.create({
    data: {
      userId: user.id,
      type: CodeType.PasswordReset,
      expiresAt,
    },
  });

  const url = `${APP_ORIGIN}/password/reset?code=${
    verificationCode.id
  }&exp=${expiresAt.getTime()}`;

  const { data, error } = await sendMail({
    to: user.email,
    ...getPasswordResetTemplate(url),
  });
  appAssert(
    data?.id,
    INTERNAL_SERVER_ERROR,
    `${error?.name} - ${error?.message}`
  );

  return {
    url,
    emailId: data.id,
  };
};

type ResetPasswordParams = {
  password: string;
  code: string;
};

export const resetPassword = async ({
  password,
  code,
}: ResetPasswordParams) => {
  const validCode = await prisma.code.findUnique({
    where: { id: code },
    include: { user: true },
  });
  appAssert(
    validCode && validCode.expiresAt > new Date(),
    NOT_FOUND,
    "Invalid or expired verification code"
  );

  const updatedUser = await prisma.user.update({
    where: { id: validCode.userId },
    data: { password: await hashValue(password) },
  });
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to reset password");

  await prisma.code.delete({
    where: { id: validCode.id },
  });

  await prisma.session.deleteMany({
    where: { userId: updatedUser.id },
  });

  return {
    user: { ...updatedUser, password: undefined },
  };
};
