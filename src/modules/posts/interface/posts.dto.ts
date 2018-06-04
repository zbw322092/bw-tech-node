import { Length, IsInt, IsEnum, IsOptional, IsBoolean, IsArray, MaxLength, ValidateNested, Min, Max } from 'class-validator';
import { PostStatus, PostFormat, PostOrder, PostFeatured, PostVisibility } from '../../common/const/PostConst';

export class AddPostDto {
	@Length(1, 1000)
	public title: string = '';

	public html: string = '';

	public plaintext: string = '';

	@Length(1, 255)
	@IsOptional()
	public featureImage: string | null = '';

	@IsEnum(PostFeatured)
	public featured: PostFeatured = PostFeatured.notFeatured;

	// @Length(1, 255)
	@IsEnum(PostStatus)
	public status: PostStatus = PostStatus.published;

	@IsEnum(PostVisibility)
	public visibility: PostVisibility = PostVisibility.public;

	@Length(1, 2000)
	@IsOptional()
	public metaTitle: string | null = '';

	@Length(1, 2000)
	@IsOptional()
	public metaDescription: string | null = '';

	@Length(1, 2000)
	@IsOptional()
	public customExcerpt: string | null = '';
}

class Filter {
	@IsOptional()
	@IsEnum(PostStatus)
	public status: PostStatus = PostStatus.published;

	@IsOptional()
	@IsArray()
	@MaxLength(50, { each: true })
	public authorIdsArr: string[] = [];

	@IsOptional()
	@IsArray()
	@MaxLength(50, { each: true })
	public tagIdsArr: string[] = [];
}

export class GetPostsDto {

	@IsInt()
	public limit: number = 10;

	@IsInt()
	public page: number = 1;

	@IsArray()
	public format: string[] = [PostFormat.html];

	@IsBoolean()
	public includeTags: boolean = false;

	@IsEnum(PostOrder)
	public order: PostOrder = PostOrder.asc;

	@ValidateNested()
	public filter: Filter = { status: null, authorIdsArr: null, tagIdsArr: null };
}

export class GeneratePostsDto {
  @IsInt()
  @Min(1)
  @Max(10000)
  public amount: number = 0;
}