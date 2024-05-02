import express from "express";
import { signUpHandler, loginHandler, forgotPasswordHandler } from "../Auth Handlers/auth.handlers.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUpHandler);
authRouter.post("/login", loginHandler);
authRouter.put("/forgot-password/:email", forgotPasswordHandler);

export default authRouter;
