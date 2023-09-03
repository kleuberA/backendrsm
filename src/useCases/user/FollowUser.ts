import { IFollowUserRepository } from "../../repositories/interfaces/user/IFollowUser";

export class FollowUserUseCase {
	constructor(private readonly followUserRepository: IFollowUserRepository) {}

	async execute(userId: string, followingId: string): Promise<void> {
		await this.followUserRepository.followingUser(userId, followingId);
	}
}
