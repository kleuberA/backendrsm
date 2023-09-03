export interface ICreateUserRepository {
	create(
		name: string,
		email: string,
		password: string,
		id?: string,
		createdAt?: Date
	): Promise<void>;
}
