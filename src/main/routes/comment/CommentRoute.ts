import { Router } from "express";
import { AuthUserMiddleware } from "../../middleware/AuthUser";
import { createCommentController } from "../../factories/comment/CreateCommentFactory";

const commentRoute = Router();
const authMiddleware = new AuthUserMiddleware();

commentRoute.post(
	"/createcomment",
	authMiddleware.execute,
	async (request, response) => {
		await createCommentController.createCommentHandler(request, response);
	}
);

export { commentRoute };
