import { DeletePostRepository } from "./../../repositories/post/DeletePost";
export class DeletePostUseCase {
	constructor(private readonly deletePostRepository: DeletePostRepository) {}
	async execute(postId: string, userId: string): Promise<void> {
		return await this.deletePostRepository.deletePost(postId, userId);
	}
}
