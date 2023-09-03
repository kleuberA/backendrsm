import { DeletePostNotFound } from "../../infra/erros/DeletePostNotFound";
import prisma from "../../main/prisma";
import { IDeletePostRepository } from "../interfaces/post/IDeletePost";

export class DeletePostRepository implements IDeletePostRepository {
	async deletePost(postId: string, userId: string): Promise<void> {
		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		});
		if (!post) {
			throw new DeletePostNotFound();
		}

		if (post.authorId !== userId) {
			throw new Error("Você não tem permissão para deletar esse post");
		}

		await prisma.post.delete({
			where: {
				id: postId,
			},
		});

		return;
	}
}
