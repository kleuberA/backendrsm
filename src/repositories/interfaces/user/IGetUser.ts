export interface IGetUserRepository {
	getUserById(id: string): Promise<void>;
}
