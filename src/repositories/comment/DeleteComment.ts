import prisma from "../../main/prisma";
import { IDeleteCommentRepository } from "../interfaces/comment/IDeleteComment";

export class DeleteCommentRepository implements IDeleteCommentRepository {
	async deleteComment(id: string): Promise<void> {
		const comment = await prisma.comments.findUnique({
			where: {
				id,
			},
		});

		if (!comment) {
			throw new Error("Comment not found");
		}
	}
}
