import { IGetPostRepository } from "../../repositories/interfaces/post/GetPost";

export class GetPostUseCase {
	constructor(private readonly getPostRepository: IGetPostRepository) {}
	async execute(postId: string): Promise<void> {
		return await this.getPostRepository.getPost(postId);
	}
}
