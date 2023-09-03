import { TPostEntity } from "./../../domain/entities/post/Post";
import { IPostRepository } from "../../repositories/interfaces/post/IPost";

export class PostUseCase {
	constructor(private readonly createPostRepository: IPostRepository) {}
	async execute(post: TPostEntity): Promise<void> {
		return await this.createPostRepository.create(post);
	}
}
