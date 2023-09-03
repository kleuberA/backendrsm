import { TPostEntity } from "../../domain/entities/post/Post";
import prisma from "../../main/prisma";
import { IPostRepository } from "../interfaces/post/IPost";

export class CreatePostRepository implements IPostRepository {
	async create(postEntity: TPostEntity) {
		const user = await prisma.user.findUnique({
			where: {
				id: postEntity.authorId,
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		await prisma.post.create({
			data: {
				title: postEntity.title,
				content: postEntity.content,
				authorId: postEntity.authorId,
				updatedAt: new Date(),
			},
		});
	}
}
