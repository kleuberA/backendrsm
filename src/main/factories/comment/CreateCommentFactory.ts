import { CreateCommentController } from "./../../controllers/comment/CreateCommentController";
import { CreateCommentUseCase } from "../../../useCases/comment/CreateComment";
import { CreateCommentRepository } from "./../../../repositories/comment/CreateComment";

const createCommentRepository = new CreateCommentRepository();
const createCommentUseCase = new CreateCommentUseCase(createCommentRepository);
const createCommentController = new CreateCommentController(
	createCommentUseCase
);

export { createCommentController };
