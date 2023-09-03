import { UpdatePostUseCase } from "./../../../useCases/post/UpdatePost";
import { UpdatePostRepository } from "./../../../repositories/post/UpdatePost";
import { UpdatePostController } from "../../controllers/post/UpdatePostController";

const updatePostRepository = new UpdatePostRepository();
const updatePostUseCase = new UpdatePostUseCase(updatePostRepository);
const updatePostController = new UpdatePostController(updatePostUseCase);

export { updatePostController };
