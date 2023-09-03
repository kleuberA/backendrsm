export class ErrorAuthentication extends Error {
	constructor() {
		super("Error Authentication.");
		this.name = "ErrorAuthentication";
	}
}
