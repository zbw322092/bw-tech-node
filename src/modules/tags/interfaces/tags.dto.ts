import { Length, IsEnum, IsOptional } from 'class-validator';
import { TagsVisibility } from '../../common/const/TagsConst';

export class AddTagDto {
  @Length(1, 150)
  public name: string = '';

  @Length(1, 500)
  @IsOptional()
  public description: string | null;

  @Length(1, 2000)
  @IsOptional()
  public featureImage: string | null;

  @Length(1, 50)
  @IsOptional()
  public parentId: string | null;

  @IsEnum(TagsVisibility)
  public visibility: TagsVisibility = TagsVisibility.public;

  @Length(1, 2000)
  @IsOptional()
  public metaTitle: string | null;

  @Length(1, 2000)
  @IsOptional()
  public metaDescription: string | null;
}