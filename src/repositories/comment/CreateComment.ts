import { TCommentEntity } from "../../domain/entities/comments/Comment";
import prisma from "../../main/prisma";
import { ICreateCommentRepository } from "../interfaces/comment/ICreateComment";

export class CreateCommentRepository implements ICreateCommentRepository {
	async createComment(comment: TCommentEntity) {
		const user = await prisma.user.findUnique({
            where: {
                id: comment.authorId,
            },
        });
        if(!user) {
            throw new Error("User not found");
        }
        const post = await prisma.post.findUnique({
            where: {
                id: comment.postId,
            },
        });
        if(!post) {
            throw new Error("Post not found");
        }
        await prisma.comments.create({
            data: {
                content: comment.content,
                authorId: comment.authorId,
                postId: comment.postId,
                updatedAt: new Date(),
            },
        });
	}
}
