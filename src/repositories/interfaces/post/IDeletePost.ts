export interface IDeletePostRepository {
	deletePost(postId: string, userId: string): Promise<void>;
}
