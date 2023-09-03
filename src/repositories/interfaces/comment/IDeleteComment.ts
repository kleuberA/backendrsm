export interface IDeleteCommentRepository {
	deleteComment(id: string): Promise<void>;
}
