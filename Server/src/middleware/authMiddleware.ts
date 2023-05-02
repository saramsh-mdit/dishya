import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization as string;
    const data = verifyToken(token);
    if (data) {
      res.locals.userId = data?._id;
    }
    next();
  } catch (e) {
    console.log(e);
    res.status(403).send({ message: "Unauthorized" });
  }
};
export default AuthMiddleware;
