import { Bcrypt } from "../../../infra/bcrypt/Bcrypt";
import { CreateUserRepository } from "../../../repositories/user/CreateUser";
import { CreateUser } from "../../../useCases/user/CreateUser";
import env from "../../config/env";
import { UserController } from "../../controllers/CreateUserController";

const bcrypt = new Bcrypt(env.bcryptSalt);
const createUserRepository = new CreateUserRepository(bcrypt);
const createUserUseCase = new CreateUser(createUserRepository);
const userController = new UserController(createUserUseCase);

export { userController };
