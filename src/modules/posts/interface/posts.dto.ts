import { Length, IsInt, IsEnum, IsOptional, IsBoolean, IsArray, MaxLength, ValidateNested, Min, Max } from "class-validator";
import { PostStatus, PostFormat, PostOrder, PostFeatured, PostVisibility } from "../../common/const/PostConst";

export class AddPostDto {
	@Length(1, 1000)
	title: string = '';

	html: string = '';

	plaintext: string = '';

	@Length(1, 255)
	@IsOptional()
	featureImage: string | null = ''

	@IsEnum(PostFeatured)
	featured: PostFeatured = PostFeatured.notFeatured;

	// @Length(1, 255)
	@IsEnum(PostStatus)
	status: PostStatus = PostStatus.published;

	@IsEnum(PostVisibility)
	visibility: PostVisibility = PostVisibility.public;

	@Length(1, 2000)
	@IsOptional()
	metaTitle: string | null = '';

	@Length(1, 2000)
	@IsOptional()
	metaDescription: string | null = '';

	@Length(1, 2000)
	@IsOptional()
	customExcerpt: string | null = '';
}

class Filter {
	@IsOptional()
	@IsEnum(PostStatus)
	status: string | null = PostStatus.published;

	@IsOptional()
	@IsArray()
	@MaxLength(50, { each: true })
	authorIdsArr: string[] = [];
	
	@IsOptional()
	@IsArray()
	@MaxLength(50, { each: true })
	tagIdsArr: string[] = [];
}

export class GetPostsDto {
	
	@IsInt()
	limit: number = 10;

	@IsInt()
	page: number = 1;

	@IsEnum(PostFormat)
	format: string = PostFormat.html;

	@IsBoolean()
	includeTags: boolean = false;

	@IsEnum(PostOrder)
	order: PostOrder = PostOrder.asc;

	@ValidateNested()
	filter: Filter
}

export class GeneratePostsDto {
  @IsInt()
  @Min(1)
  @Max(10000)
  amount: number = 0;
}