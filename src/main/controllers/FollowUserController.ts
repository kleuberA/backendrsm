import { Request, Response } from "express";
import { FollowUserUseCase } from "../../useCases/user/FollowUser";
import { FollowerNotExist } from "../../infra/erros/FollowerNotExist";

export class FollowUserController {
	constructor(private readonly followUserUseCase: FollowUserUseCase) {}

	async followingUserHandler(request: Request, response: Response) {
		const { userId, followingId } = request.body;
		try {
			await this.followUserUseCase.execute(userId, followingId);
			return response.status(201).send({
				message: "User followed successfully.",
				status: "success",
			});
		} catch (error: any) {
			if (error instanceof FollowerNotExist) {
				return response.status(400).send({
					message: error.message,
					status: "error",
				});
			}
			return response.status(500).send({
				message: "Internal server error",
				status: "error",
				error: error.message,
			});
		}
	}
}
