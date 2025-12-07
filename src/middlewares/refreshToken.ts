import { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth.service";
import { JWT_SECRET } from "../config/env";

export const refreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send.bind(res);

  res.send = (body?: any) => {
    if (res.statusCode === 200) {
      const token = AuthService.generateToken({ user: req.user }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.setHeader("x-token-refresh", token);
    }

    return originalSend(body);
  };

  next();
};
