import { FollowerNotExist } from "../../infra/erros/FollowerNotExist";
import prisma from "../../main/prisma";
import { IFollowUserRepository } from "../interfaces/user/IFollowUser";

export class FollowUserRepository implements IFollowUserRepository {
	async followingUser(userId: string, followingId: string): Promise<void> {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			throw new FollowerNotExist();
		}

		const followingUser = await prisma.user.findUnique({
			where: {
				id: followingId,
			},
		});

		if (!followingUser) {
			throw new FollowerNotExist();
		}

		await prisma.following.create({
			data: {
				userId: user.id,
				followingId: followingUser.id,
			},
		});

		// Atualiza os seguidores do usuário que está sendo seguido
		await prisma.followers.create({
			data: {
				userId: followingUser.id,
				followerId: user.id,
			},
		});
	}
}
