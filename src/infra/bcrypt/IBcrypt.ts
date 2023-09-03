export interface IBcrypt {
	hash(password: string, saltRounds: number): Promise<string> | string;
	compare(password: string, hash: string): Promise<boolean>;
}
