export class RouterNotFound extends Error {
	constructor() {
		super("Router not found");
		this.name = "RouterNotFound";
	}
}
