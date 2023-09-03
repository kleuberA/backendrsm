import { Router, Response, Request } from "express";
import { postController } from "../../factories/post/PostFactory";
import { getPostController } from "../../factories/post/GetPostFactory";
import { AuthUserMiddleware } from "../../middleware/AuthUser";
import { updatePostController } from "../../factories/post/UpdatePostFactory";
import { deletePostController } from "../../factories/post/DeletePostFactory";

const postRouter = Router();
const authMiddleware = new AuthUserMiddleware();

postRouter.post(
	"/createpost",
	authMiddleware.execute,
	async (request: Request, response: Response) => {
		await postController.createPostHandler(request, response);
	}
);
postRouter.get(
	"/getpost/:postId",
	authMiddleware.execute,
	async (request: Request, response: Response) => {
		await getPostController.getPostHandler(request, response);
	}
);

postRouter.put(
	"/updatepost/:postId",
	authMiddleware.execute,
	async (request: Request, response: Response) => {
		await updatePostController.updatePostHandler(request, response);
	}
);

postRouter.delete(
	"/deletepost/:postId",
	authMiddleware.execute,
	async (request: Request, response: Response) => {
		await deletePostController.deletePostHandler(request, response);
	}
);

export { postRouter };
