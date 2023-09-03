import { CreatePostRepository } from "../../../repositories/post/CreatePost";
import { PostUseCase } from "../../../useCases/post/Post";
import { CreatePostController } from "../../controllers/post/CreatePostController";

const postRepository = new CreatePostRepository();
const postUseCase = new PostUseCase(postRepository);
const postController = new CreatePostController(postUseCase);

export { postController };
