export interface IAuthUserRepository {
	auth(email: string, password: string): Promise<string>;
}
