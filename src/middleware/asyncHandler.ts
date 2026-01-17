import { RequestHandler } from "express";

/**
 * async route handler에서 throw/reject가 나면 next(err)로 넘겨서
 * 에러 핸들러가 잡을 수 있게 만드는 래퍼
 */
export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
