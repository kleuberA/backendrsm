import { TPostEntity } from "./../../domain/entities/post/Post";
import { UpdatePostRepository } from "./../../repositories/post/UpdatePost";
export class UpdatePostUseCase {
	constructor(private readonly updatePostRepository: UpdatePostRepository) {}
	async execute(postId: string, postEntity: TPostEntity): Promise<void> {
		return await this.updatePostRepository.updatePost(postId, postEntity);
	}
}
