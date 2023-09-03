export class FollowerNotExist extends Error {
	constructor() {
		super("Follower does not exist.");
		this.name = "FollowerNotExist";
	}
}
