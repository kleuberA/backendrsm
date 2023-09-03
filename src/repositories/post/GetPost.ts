import { TCommentEntity } from "../../domain/entities/comments/Comment";
import { PostNotFound } from "../../infra/erros/PostNotFound";
import prisma from "../../main/prisma";
import { IGetPostRepository } from "../interfaces/post/GetPost";

export class GetPostRepository implements IGetPostRepository {
	async numberOfComments(postId: string): Promise<number> {
		const countComments = await prisma.comments.count({
			where: {
				postId,
			},
		});

		return countComments;
	}

	async getComments(postId: string): Promise<any> {
		const comments = await prisma.comments.findMany({
			where: {
				postId,
			},
		});

		return comments;
	}

	async getPost(postId: string): Promise<any> {
		const post = await prisma.post.findUnique({
			where: {
				id: postId,
			},
		});

		if (!post) {
			throw new PostNotFound();
		}
		const comments = await this.getComments(postId);
		const numberOfComments = await this.numberOfComments(postId);

		return {
			...post,
			numberOfComments,
			comments,
		};
	}
}
