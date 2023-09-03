import { TPostEntity } from "../../../domain/entities/post/Post";

export interface IUpdatePostRepository {
	updatePost(postId: string, postEntity: TPostEntity): Promise<void>;
}
