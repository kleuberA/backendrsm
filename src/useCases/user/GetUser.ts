import { IGetUserRepository } from "../../repositories/interfaces/user/IGetUser";
export class GetUserUserCase {
	constructor(private readonly getUserRepository: IGetUserRepository) {}
	async execute(id: string): Promise<any> {
		return await this.getUserRepository.getUserById(id);
	}
}
