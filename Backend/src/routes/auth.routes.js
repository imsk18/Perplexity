import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";

const authRouter = Router();

/**
 * access public
 * post api/auth/register
 */

authRouter.post("/register",registerController);


export default authRouter;