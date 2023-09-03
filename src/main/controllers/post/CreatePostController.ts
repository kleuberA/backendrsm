import { Request, Response } from "express";
import { PostUseCase } from "../../../useCases/post/Post";

export class CreatePostController {
	constructor(private readonly postUseCase: PostUseCase) {}
	async createPostHandler(request: Request, response: Response) {
		try {
			const { title, content, authorId } = request.body;
			await this.postUseCase.execute({
				title,
				content,
				authorId,
				updatedAt: new Date(),
			});
			return response.status(201).send({
				message: "Post created successfully.",
				status: "success",
			});
		} catch (error) {
			return response.status(500).send({
				message: "Internal server error",
				status: "error",
			});
		}
	}
}
