import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getCurrentUser,
  suggestedUser,
} from "../controllers/user.controller.js";
const userRouter = express.Router();
userRouter.get("/current", isAuth, getCurrentUser);
userRouter.get("/suggested", isAuth, suggestedUser);

export default userRouter;
