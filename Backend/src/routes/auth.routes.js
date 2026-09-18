import { Router } from "express";
import { registerController,loginController,getMe,verifyEmail } from "../controllers/auth.controller.js";
import { registerValidator,loginValidator } from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

/**
 * access public
 * post api/auth/register
 */

authRouter.post("/register",registerValidator,registerController);
authRouter.get("/verify-email",verifyEmail);
authRouter.post("/login",loginValidator,loginController)
authRouter.get("/get-me",authUser,getMe)



export default authRouter;