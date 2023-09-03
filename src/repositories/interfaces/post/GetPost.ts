export interface IGetPostRepository {
	getPost(postId: string): Promise<void>;
}
