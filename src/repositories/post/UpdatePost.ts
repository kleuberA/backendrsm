import { TPostEntity } from "../../domain/entities/post/Post";
import prisma from "../../main/prisma";
import { IUpdatePostRepository } from "../interfaces/post/IUpdatePost";

export class UpdatePostRepository implements IUpdatePostRepository {
	async updatePost(postId: string, postEntity: TPostEntity): Promise<void> {
		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		});
		if (!post) {
			throw new Error("Post not found");
		}
		await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				content: postEntity.content,
				title: postEntity.title,
				authorId: postEntity.authorId,
				updatedAt: new Date(),
			},
		});

		return;
	}
}
