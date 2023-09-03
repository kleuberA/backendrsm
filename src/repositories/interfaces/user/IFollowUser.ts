export interface IFollowUserRepository {
	followingUser(userId: string, followingId: string): Promise<void>;
}
