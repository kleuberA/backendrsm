export type TCommentEntity = {
	id?: string;
	content: string;
	createdAt?: Date;
	updatedAt?: Date;
	authorId: string;
	postId: string;
};

export class CommentEntity {
	constructor(
		private readonly id: string,
		private readonly content: string,
		private readonly createdAt: Date,
		private readonly updatedAt: Date,
		private readonly authorId: string,
		private readonly postId: string
	) {}
}
