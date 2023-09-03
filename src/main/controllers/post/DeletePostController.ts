import { Request, Response } from "express";
import { DeletePostUseCase } from "../../../useCases/post/DeletePost";
import { DeletePostNotFound } from "../../../infra/erros/DeletePostNotFound";
import { Jwt } from "../../../infra/jwt/Jwt";

export class DeletePostController {
	constructor(private readonly deletePostUseCase: DeletePostUseCase) {}
	async deletePostHandler(request: Request, response: Response) {
		try {
			const { postId } = request.params;

			const authHeader = request.headers.authorization;

			if (!authHeader) {
				return response.status(401).send({
					message: "Unauthorized",
					status: "error",
				});
			}

			const token = authHeader?.split(" ")[1];
			const decodedToken = Jwt.verify(
				token,
				process.env.JWT_SECRET
			) as unknown as { userId: string };
			const userId = decodedToken.userId as string;

			await this.deletePostUseCase.execute(postId, userId);

			return response.status(200).send({
				message: "Post deleted successfully.",
				status: "success",
			});
		} catch (error) {
			if (error instanceof DeletePostNotFound) {
				return response.status(404).send({
					message: error.message,
					status: "error",
				});
			}
			return response.status(500).send({
				message: "Internal server error",
				status: "error",
			});
		}
	}
}
