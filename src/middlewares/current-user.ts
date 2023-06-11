import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {NotAuthorizedError} from "../errors/not-authorized-error";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.token!) {
    throw new NotAuthorizedError();
  }

  try {
    const token: string = String(req.headers.token).split(' ')[1];
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
    return next();
  } catch (err) {}
  throw new NotAuthorizedError();
};
