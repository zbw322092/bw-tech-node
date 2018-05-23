import { Length, IsArray, MaxLength } from "class-validator";

export class AddPostTagDto {
  
  @Length(1, 50)
  postId: string = '';

  @IsArray()
  @MaxLength(50, { each: true })
  tagIdsArr: string[] = [];
}