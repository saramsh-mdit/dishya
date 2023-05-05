import { Router } from "express";

import logger from "../../utils/logger";
import { addUser } from "../user/users.service";
import { isAuthUser } from "./auth.service";

const AuthController = Router();

AuthController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password)
      throw {
        message: "email and password is required.",
      };
    const data = await isAuthUser(email, password);
    res.send(data);
  } catch (err) {
    logger.error(err);
    res.status(err?.head ?? 404).send(err);
  }
});

AuthController.post("/register", async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    const data = await addUser({ userName, password, email, isAdmin: false });
    res.status(200).send(data);
  } catch (err) {
    logger.error(err);
    res.status(404).send(err);
  }
});

export default AuthController;
