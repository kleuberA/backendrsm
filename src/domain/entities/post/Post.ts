export type TPostEntity = {
	id?: string;
	title: string;
	content: string;
	createdAt?: Date;
	updatedAt?: Date;
	authorId: string;
};

export class PostEntity {
	constructor(
		private readonly id: string,
		private readonly title: string,
		private readonly content: string,
		private readonly createdAt: Date,
		private readonly updatedAt: Date,
		private readonly authorId: string
	) {}
}
