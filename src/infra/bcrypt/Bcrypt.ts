import { IBcrypt } from "./IBcrypt";
import bcrypt from "bcrypt";

export class Bcrypt implements IBcrypt {
	constructor(private readonly saltRounds: number) {}
	hash(password: string): Promise<string> {
		return bcrypt.hash(password, this.saltRounds);
	}
	compare(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}
