import { TCommentEntity } from "../../domain/entities/comments/Comment";
import { CreateCommentRepository } from "./../../repositories/comment/CreateComment";
export class CreateCommentUseCase {
	constructor(
		private readonly createCommentRepository: CreateCommentRepository
	) {}
	async execute(comment: TCommentEntity) {
		await this.createCommentRepository.createComment(comment);
	}
}
