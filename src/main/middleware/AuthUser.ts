import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config/env";

declare global {
	namespace Express {
		interface Request {
			user?: JwtPayload["user"];
		}
	}
}

export class AuthUserMiddleware {
	async execute(request: Request, response: Response, next: NextFunction) {
		const token = request.header("Authorization");
		if (!token) {
			return response
				.status(401)
				.json({ message: "Authorization token missing" });
		}
		try {
			const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
			request.user = decoded.user;
			next();
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				return response
					.status(401)
					.json({ message: "Token has expired" });
			} else if (error instanceof jwt.JsonWebTokenError) {
				return response.status(401).json({ message: "Invalid token" });
			} else {
				return response
					.status(500)
					.json({ message: "Internal server error" });
			}
		}
	}
}
