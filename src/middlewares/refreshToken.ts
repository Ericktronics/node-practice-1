import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth.service";
import { JWT_SECRET } from "../config/env";
import { logger } from "../config/logger";

export const refreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;
  const originalJson = res.json;

  function handleRefresh() {
    if (res.statusCode === 200 && req.user) {
      const token = AuthService.generateToken({ user: req.user }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.setHeader("x-token-refresh", token);
    }
  }

  if (res.send) {
    res.send = function (this: Response, body?: any) {
      handleRefresh();
      return originalSend.call(this, body);
    };
  }

  if (res.json) {
    res.json = function (this: Response, body?: any) {
      handleRefresh();
      return originalJson.call(this, body);
    };
  }

  next();
};
