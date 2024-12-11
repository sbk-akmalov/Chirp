import { z } from "zod";
import { FORBIDDEN, NOT_FOUND, OK } from "../constants/http.js";
import catchErrors from "../utils/catch.errors.js";
import appAssert from "../utils/app.assert.js";
import prisma from "../config/prisma.js";

export const getSessionsHandler = catchErrors(async (req, res) => {
  const sessions = await prisma.session.findMany({
    where: {
      userId: req.userId,
      expiresAt: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
      userAgent: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(OK).json(
    sessions.map((session) => ({
      ...session,
      ...(session.id === req.sessionId && {
        isCurrent: true,
      }),
    }))
  );
});

export const deleteSessionHandler = catchErrors(async (req, res) => {
  const sessionId = z.string().min(1).max(24).parse(req.params.id);
  appAssert(
    sessionId !== req.sessionId,
    FORBIDDEN,
    "You cannot delete your current session"
  );

  const deleted = await prisma.session.deleteMany({
    where: {
      id: sessionId,
      userId: req.userId,
    },
  });
  appAssert(deleted.count > 0, NOT_FOUND, "Session not found");

  return res.status(OK).json({ message: "Session deleted" });
});
