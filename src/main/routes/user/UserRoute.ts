import { Router, Request, Response } from "express";
import { userController } from "../../factories/user/CreateUserFactory";
import { authController } from "../../factories/auth/AuthUserFactory";
import { followUserController } from "../../factories/user/FollowUserFactory";
import { AuthUserMiddleware } from "../../middleware/AuthUser";
import { getUserController } from "../../factories/user/GetUserFactory";

const userRoute = Router();
const authMiddleware = new AuthUserMiddleware();

userRoute.post("/createuser", async (request: Request, response: Response) => {
	await userController.createUserHandler(request, response);
});
userRoute.post("/login", async (request: Request, response: Response) => {
	await authController.authUserHandler(request, response);
});

userRoute.post(
	"/follow",

	async (request: Request, response: Response) => {
		await followUserController.followingUserHandler(request, response);
	}
);

userRoute.post("/unfollow", async (request: Request, response: Response) => {});

userRoute.get("/user/:id", async (request: Request, response: Response) => {
	await getUserController.getUserHandler(request, response);
});

export { userRoute };
