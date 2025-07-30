import express from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller";
const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);
authRouter.post("/signOut", signOut);

export default authRouter;
