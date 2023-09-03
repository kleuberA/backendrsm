export class PostNotFound extends Error {
	constructor() {
		super("Post not found");
		this.name = "PostNotFound";
	}
}
