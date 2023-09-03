import { ICreateUserRepository } from "../interfaces/user/ICreateUser";
import prisma from "../../main/prisma";
import { UserExists } from "../../infra/erros/UserExists";
import { IBcrypt } from "../../infra/bcrypt/IBcrypt";

export class CreateUserRepository implements ICreateUserRepository {
	constructor(private readonly bcrypt: IBcrypt) {}

	async create(
		name: string,
		email: string,
		password: string,
		id?: string,
		createdAt?: Date
	): Promise<void> {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (user) {
			throw new UserExists();
		}

		const hashPassword = await this.bcrypt.hash(password, 10);

		await prisma.user.create({
			data: {
				name: name,
				email: email,
				createdAt: new Date(),
				password: hashPassword,
			},
		});
	}
}
