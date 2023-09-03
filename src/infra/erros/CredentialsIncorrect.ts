export class CredentialsIncorrect extends Error {
	constructor() {
		super("Credentials Incorrect.");
		this.name = "CredentialsIncorrect";
	}
}
