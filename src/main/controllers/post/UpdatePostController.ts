import { Request, Response } from "express";
import { UpdatePostUseCase } from "./../../../useCases/post/UpdatePost";
export class UpdatePostController {
	constructor(private readonly updatePostUseCase: UpdatePostUseCase) {}
	async updatePostHandler(request: Request, response: Response) {
		try {
			const { title, content, authorId } = request.body;
			const { postId } = request.params;
			await this.updatePostUseCase.execute(postId, {
				title,
				content,
				authorId,
				updatedAt: new Date(),
			});
			return response.status(200).send({
				message: "Post updated successfully.",
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
