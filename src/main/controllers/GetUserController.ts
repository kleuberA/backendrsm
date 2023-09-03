import { Request, Response } from "express";
import { GetUserUserCase } from "../../useCases/user/GetUser";

export class GetUserController {
	constructor(private readonly getUserUseCase: GetUserUserCase) {}
	async getUserHandler(request: Request, response: Response) {
		const { id } = request.params;
		try {
			const user = await this.getUserUseCase.execute(id);
			return response.status(200).send({
				message: "User found successfully.",
				status: "success",
				data: user,
			});
		} catch (error) {
			return response.status(500).send({
				message: "Internal server error",
				status: "error",
			});
		}
	}
}
