export class DeletePostNotFound extends Error {
	constructor() {
		super("Post not found");
		this.name = "DeletePostNotFound";
	}
}
