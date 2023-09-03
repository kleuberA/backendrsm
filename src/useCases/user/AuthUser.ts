import { IAuthUserRepository } from "../../repositories/interfaces/user/IAuthUser";

export class AuthUserUseCase {
	constructor(private readonly authUserRepository: IAuthUserRepository) {}
	async execute(email: string, password: string): Promise<string> {
		return await this.authUserRepository.auth(email, password);
	}
}
