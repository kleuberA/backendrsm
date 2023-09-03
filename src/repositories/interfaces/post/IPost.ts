import { TPostEntity } from "../../../domain/entities/post/Post";

export interface IPostRepository {
	create(postEntity: TPostEntity): Promise<void>;
}
