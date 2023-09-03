import { ICreateUserRepository } from "../../repositories/interfaces/user/ICreateUser";

export class CreateUser {
	constructor(private readonly CreateUserRepository: ICreateUserRepository) {}
	async execute(
		name: string,
		email: string,
		password: string
	): Promise<void> {
		return await this.CreateUserRepository.create(name, email, password);
	}
}
