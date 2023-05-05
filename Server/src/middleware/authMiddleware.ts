import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";
import { AppDataSource } from "../data-source";
import { Users } from "../entities/users";

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.authorization as string;
    const data = verifyToken(token);
    if (data) {
      const user = await AppDataSource.getRepository(Users).findOne({
        where: {
          _id: data._id,
        },
      });
      if (user) res.locals.userId = data?._id;
      else throw {};
    }
    next();
  } catch (e) {
    res.status(401).send({ message: "Unauthorized" });
  }
};
export default AuthMiddleware;
