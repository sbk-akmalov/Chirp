import assert from "node:assert";
import ErrorCode from "../constants/error.code.js";
import { HttpStatusCode } from "../constants/http.js";
import AppError from "./app.error.js";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  errorCode?: ErrorCode
) => asserts condition;

const appAssert: AppAssert = (condition, httpStatusCode, message, errorCode) =>
  assert(condition, new AppError(httpStatusCode, message, errorCode));

export default appAssert;
