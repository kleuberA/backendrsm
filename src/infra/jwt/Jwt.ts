import { IJwt } from "./IJwt";
import jwt from "jsonwebtoken";

export class Jwt implements IJwt {
	static decode(token: string) {
		throw new Error("Method not implemented.");
	}
	static verify(token: string, JWT_SECRET: string | undefined) {
		throw new Error("Method not implemented.");
	}
	sign(
		payload: object,
		secretOrPrivateKey: string,
		options?: object
	): string {
		return jwt.sign(payload, secretOrPrivateKey, options);
	}

	verify(
		token: string,
		secretOrPublicKey: string,
		options?: object
	): object | string {
		return jwt.verify(token, secretOrPublicKey, options);
	}

	decode(
		token: string,
		options?: object
	): null | { [key: string]: any } | string {
		return jwt.decode(token, options);
	}
}
