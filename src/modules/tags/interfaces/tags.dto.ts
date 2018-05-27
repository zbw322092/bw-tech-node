import { Length, IsEnum, IsOptional } from "class-validator";
import { TagsVisibility } from "../../common/const/TagsConst";

export class AddTagDto {
  @Length(1, 150)
  name: string = '';

  @Length(1, 500)
  @IsOptional()
  description: string | null;

  @Length(1, 2000)
  @IsOptional()
  featureImage: string | null;

  @Length(1, 50)
  @IsOptional()
  parentId: string | null;

  @IsEnum(TagsVisibility)
  visibility: TagsVisibility = TagsVisibility.public;

  @Length(1, 2000)
  @IsOptional()
  metaTitle: string | null;

  @Length(1, 2000)
  @IsOptional()
  metaDescription: string | null;
}