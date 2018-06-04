import { AddPostDto, GetPostsDto } from './posts.dto';
import { ICommonResponse } from '../../common/interfaces/ICommonResponse';
import { GetPostsVo } from './posts.vo';

export interface IPostsSerrvice {
  createPost(session: any, addPostDto: AddPostDto): Promise<ICommonResponse<{}>>;
  getPosts(session: any, getPostsDto: GetPostsDto): Promise<ICommonResponse<GetPostsVo | {}>>;
}