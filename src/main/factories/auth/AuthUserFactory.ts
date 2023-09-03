import { Bcrypt } from "../../../infra/bcrypt/Bcrypt";
import { Jwt } from "../../../infra/jwt/Jwt";
import env from "../../config/env";
import { AuthUserRepository } from "../../../repositories/user/AuthUser";
import { AuthUserUseCase } from "../../../useCases/user/AuthUser";
import { AuthController } from "./../../controllers/AuthUserController";

const bcrypt = new Bcrypt(env.bcryptSalt);
const jwt = new Jwt();
const authUserRepository = new AuthUserRepository(bcrypt, jwt);
const authUserUseCase = new AuthUserUseCase(authUserRepository);
const authController = new AuthController(authUserUseCase);

export { authController };
