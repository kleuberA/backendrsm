import { DeletePostUseCase } from "../../../useCases/post/DeletePost";
import { DeletePostController } from "../../controllers/post/DeletePostController";
import { DeletePostRepository } from "./../../../repositories/post/DeletePost";

const deletePostRepository = new DeletePostRepository();
const deletePostUseCase = new DeletePostUseCase(deletePostRepository);
const deletePostController = new DeletePostController(deletePostUseCase);

export { deletePostController };
