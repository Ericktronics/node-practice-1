import { Request, Response, NextFunction } from "express";
import { isProjectMember } from "../services/projectMember.service";

export async function permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  const { role, id } = req.user.user;

  const baseUrl = req.baseUrl;
  const isUserRoute = baseUrl === "/api/user";
  const isProjectRoute = baseUrl === "/api/project";

  const method = req.method.toUpperCase();
  const hasParamId = typeof req.params.id !== "undefined";
  const paramId = hasParamId ? Number(req.params.id) : NaN;
  const userId = Number(id);

  if (isUserRoute && role === "HR_ADMIN") {
    return next();
  }

  if (isProjectRoute && role === "PROJECT_ADMIN") {
    return next();
  }

  if (role === "Member") {
    if (isUserRoute && method === "GET" && hasParamId) {
      if (paramId === userId) {
        return next();
      }
      return res
        .status(403)
        .json({ message: "Members can only view their own profile" });
    }

    if (isProjectRoute && method === "GET" && hasParamId) {
      try {
        const isMember = await isProjectMember(userId, paramId);
        if (!isMember) {
          return res
            .status(403)
            .json({ message: "You are not a member of this project" });
        }
        return next();
      } catch (error) {
        return res.status(500).json({ message: "Permission check failed" });
      }
    }
  }

  return res.status(403).json({ message: "Forbidden" });
}
