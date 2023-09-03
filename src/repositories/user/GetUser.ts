import prisma from "../../main/prisma";
import { IGetUserRepository } from "../interfaces/user/IGetUser";

export class GetUserRepository implements IGetUserRepository {
	async getFollowingUser(): Promise<any> {
		const following = await prisma.following.findFirst();
		return following;
	}

	async getFollowersUser(): Promise<any> {
		const followers = await prisma.followers.findFirst();
		return followers;
	}

	async getCountPostUser(): Promise<any> {
		const postCount = await prisma.post.count();
		return postCount;
	}

	async getCountFollowersUser(): Promise<number> {
		const followersCount = await prisma.followers.count();
		return followersCount;
	}

	async getCountFollowingUser(): Promise<number> {
		const following = await prisma.following.count();
		return following;
	}

	async getPostUser(): Promise<any> {
		const post = await prisma.post.findMany();
		return post;
	}

	async getUserProfile(): Promise<any> {
		const userProfile = await prisma.profile.findMany();
		return userProfile;
	}

	async getUserById(id: string): Promise<any> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		const [
			userPosts,
			userProfile,
			postCount,
			followersUser,
			followingUser,
			countFollowersUser,
			countFollowingUser,
		] = await Promise.all([
			this.getPostUser(),
			this.getUserProfile(),
			this.getCountPostUser(),
			this.getFollowersUser(),
			this.getFollowingUser(),
			this.getCountFollowersUser(),
			this.getCountFollowingUser(),
		]);

		return {
			...user,
			posts: userPosts,
			profile: userProfile,
			postCount: postCount,
			followersCount: countFollowersUser,
			followingCount: countFollowingUser,
			followers: followersUser,
			following: followingUser,
		};
	}
}
