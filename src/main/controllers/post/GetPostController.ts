import { PostNotFound } from "../../../infra/erros/PostNotFound";
import { GetPostUseCase } from "../../../useCases/post/GetPost";
import { Request, Response } from "express";

export class GetPostController {
	constructor(private readonly getPostUseCase: GetPostUseCase) {}
	async getPostHandler(request: Request, response: Response) {
		try {
			const { postId } = request.params;

			const post = await this.getPostUseCase.execute(postId);
			return response.status(200).send({
				message: "Post fetched successfully.",
				status: "success",
				post,
			});
		} catch (error) {
			if (error instanceof PostNotFound) {
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
