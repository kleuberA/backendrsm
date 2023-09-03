import { Request, Response } from "express";

import { AuthUserUseCase } from "../../useCases/user/AuthUser";
import { CredentialsIncorrect } from "../../infra/erros/CredentialsIncorrect";
import { ErrorAuthentication } from "../../infra/erros/ErrorAuthentication";

export class AuthController {
	private invalidLoginAttempts: Map<string, number> = new Map();
	private invalidLoginAttemptsByIP: Map<string, number> = new Map();
	private readonly maxInvalidAttempts: number = 5;
	private readonly blockDurationMinutes: number = 2;

	constructor(private readonly authUser: AuthUserUseCase) {}

	async authUserHandler(request: Request, response: Response) {
		const email = request.body.email;
		const ipAddress = request.ip;
		try {
			const { email, password } = request.body;

			const blockedUntil = this.invalidLoginAttempts.get(email);
			if (blockedUntil && blockedUntil > Date.now()) {
				const remainingTime = (blockedUntil - Date.now()) / 1000;
				return response.status(400).send({
					message: `Too many invalid login attempts. Please try again after ${remainingTime.toFixed(
						0
					)} seconds.`,
					status: "error",
				});
			}

			const ipBlockedUntil = this.invalidLoginAttemptsByIP.get(ipAddress);
			if (ipBlockedUntil && ipBlockedUntil > Date.now()) {
				const remainingTime = (ipBlockedUntil - Date.now()) / 1000;
				return response.status(400).send({
					message: `Too many invalid login attempts from this IP address. Please try again after ${remainingTime.toFixed(
						0
					)} seconds.`,
					status: "error",
				});
			}

			const token = await this.authUser.execute(email, password);

			this.invalidLoginAttempts.delete(email);
			this.invalidLoginAttemptsByIP.delete(ipAddress);

			return response
				.status(200)
				.cookie("token", token, {
					httpOnly: true,
					maxAge: 3600000,
				})
				.send({
					message: "User authenticated successfully.",
					status: "success",
					token,
				});
		} catch (error) {
			if (error instanceof CredentialsIncorrect) {
				return response.status(404).send({
					message: error.message,
					status: "error",
				});
			}
			if (error instanceof ErrorAuthentication) {
				const attempts = this.invalidLoginAttempts.get(email) || 0;
				this.invalidLoginAttempts.set(email, attempts + 1);

				const ipAttempts =
					this.invalidLoginAttemptsByIP.get(ipAddress) || 0;
				this.invalidLoginAttemptsByIP.set(ipAddress, ipAttempts + 1);

				if (attempts >= this.maxInvalidAttempts) {
					const blockDuration = this.blockDurationMinutes * 60 * 1000;
					const blockedUntil = Date.now() + blockDuration;
					this.invalidLoginAttempts.set(email, blockedUntil);
					this.invalidLoginAttemptsByIP.set(ipAddress, blockedUntil);

					return response.status(400).send({
						message: `Too many invalid login attempts. Your account is blocked for ${this.blockDurationMinutes} minutes.`,
						status: "error",
					});
				}

				return response.status(401).send({
					message: error.message,
					status: "error",
				});
			}
			return response.status(500).send({
				message: "Internal server error.",
				status: "error",
			});
		}
	}
}
