import { IBcrypt } from "../../infra/bcrypt/IBcrypt";
import { CredentialsIncorrect } from "../../infra/erros/CredentialsIncorrect";
import { ErrorAuthentication } from "../../infra/erros/ErrorAuthentication";
import { IJwt } from "../../infra/jwt/IJwt";
import env from "../../main/config/env";
import prisma from "../../main/prisma";
import { IAuthUserRepository } from "../interfaces/user/IAuthUser";

interface IUser {
	id: string;
	email: string;
}

export class AuthUserRepository implements IAuthUserRepository {
	constructor(private readonly bcrypt: IBcrypt, private readonly jwt: IJwt) {}

	async auth(email: string, password: string): Promise<string> {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) {
			throw new CredentialsIncorrect();
		}
		const passwordMatch = await this.bcrypt.compare(
			password,
			user.password
		);
		if (!passwordMatch) {
			throw new ErrorAuthentication();
		}
		const token = this.generateToken({ id: user.id, email: user.email });

		return token;
	}
	private generateToken(user: IUser): string {
		const token = this.jwt.sign(user, env.jwtSecret, {
			expiresIn: "1h",
		});
		return token;
	}
}
