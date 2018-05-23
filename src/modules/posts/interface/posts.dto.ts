import { Length, IsInt, IsEnum, IsOptional } from "class-validator";
import { PostStatus } from "../../common/const/PostConst";

export class CreatePostDto {
    @Length(1, 1000)
    title: string = '';

    html: string = '';

    plaintext: string = '';

    @Length(1, 255)
    @IsOptional()
    featureImage: string | null = ''

    @IsInt()
    @IsOptional()
    featured: number | null = 0;

    // @Length(1, 255)
    @IsEnum(PostStatus)
    status: PostStatus = PostStatus.published;

    @Length(1, 50)
    visibility: string = '';

    @Length(1, 2000)
    @IsOptional()
    metaTitle: string | null = '';

    @Length(1, 2000)
    @IsOptional()
    metaDescription: string | null = '';
    
    @Length(1, 2000)
    @IsOptional()
    customExcerpt: string | null = '';

    @Length(1, 50)
    @IsOptional()
    tagId: string | null = '';
}