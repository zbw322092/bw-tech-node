import { Length } from "class-validator";

export class AddPostTagDto {
  
  @Length(1, 50)
  postId: string = '';

  @Length(1, 50)
  tagId: string = '';
}