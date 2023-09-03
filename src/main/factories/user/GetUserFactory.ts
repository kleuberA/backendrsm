import { GetUserRepository } from "../../../repositories/user/GetUser";
import { GetUserUserCase } from "../../../useCases/user/GetUser";
import { GetUserController } from "../../controllers/GetUserController";

const getUserRepository = new GetUserRepository();
const getUserUseCase = new GetUserUserCase(getUserRepository);
const getUserController = new GetUserController(getUserUseCase);

export { getUserController };
