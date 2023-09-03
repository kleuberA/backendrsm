import { Request, Response } from "express";
import { CreateUser } from "../../useCases/user/CreateUser";
import { UserExists } from "../../infra/erros/UserExists";

export class UserController {
	private readonly createUser: CreateUser;

	constructor(createUser: CreateUser) {
		this.createUser = createUser;
	}

	async createUserHandler(request: Request, response: Response) {
		try {
			const { name, email, password } = request.body;
			await this.createUser.execute(name, email, password);
			return response.status(201).send({
				message: "User created successfully.",
				status: "success",
			});
		} catch (error) {
			if (error instanceof UserExists) {
				return response.status(400).send({
					message: error.message,
					status: "error",
				});
			}
			return response.status(500).send({
				message: "Internal server error",
				status: "error",
			});
		}
	}
}
