import { FollowUserUseCase } from "../../../useCases/user/FollowUser";
import { FollowUserController } from "../../controllers/FollowUserController";
import { FollowUserRepository } from "./../../../repositories/user/FollowUser";

const followUserRepository = new FollowUserRepository();
const followUserUseCase = new FollowUserUseCase(followUserRepository);
const followUserController = new FollowUserController(followUserUseCase);

export { followUserController };
