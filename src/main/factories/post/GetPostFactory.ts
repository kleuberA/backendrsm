import { GetPostRepository } from "../../../repositories/post/GetPost";
import { GetPostUseCase } from "../../../useCases/post/GetPost";
import { GetPostController } from "../../controllers/post/GetPostController";

const getPostRepository = new GetPostRepository();
const postUseCase = new GetPostUseCase(getPostRepository);
const getPostController = new GetPostController(postUseCase);

export { getPostController };
