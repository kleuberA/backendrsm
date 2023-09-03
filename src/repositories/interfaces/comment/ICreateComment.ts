import { TCommentEntity } from "../../../domain/entities/comments/Comment";

export interface ICreateCommentRepository {
	createComment: (comment: TCommentEntity) => Promise<void>;
}
