import { Request, Response } from "express";
import { CreateCommentUseCase } from "./../../../useCases/comment/CreateComment";
export class CreateCommentController {
	constructor(private readonly createCommentUseCase: CreateCommentUseCase) {}
	async createCommentHandler(request: Request, response: Response) {
		const { content, authorId, postId } = request.body;
		try {
			await this.createCommentUseCase.execute({
				content,
				authorId,
				postId,
				updatedAt: new Date(),
			});
			return response.status(201).send({
				message: "Comment created successfully.",
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
