export class User {
	constructor(
		private readonly id: string,
		private readonly name: string,
		private readonly email: string,
		private readonly password: string,
		private readonly createAt: Date,
		private readonly updateAt: Date,
		private readonly following: User[],
		private readonly followers: User[],
		private readonly profile: []
	) {}
}
