import { Length, IsInt, IsEnum } from "class-validator";
import { PostStatus } from "../../common/const/PostConst";

export class CreatePostDto {
    @Length(1, 1000)
    title: string = '';

    html: string = '';

    plaintext: string = '';

    @Length(1, 255)
    featureImage: string = ''

    @IsInt()
    featured: number = 0;

    // @Length(1, 255)
    @IsEnum(PostStatus)
    status: PostStatus = PostStatus.published;

    @Length(1, 50)
    visibility: string = '';

    @Length(1, 2000)
    metaTitle: string = '';

    @Length(1, 2000)
    metaDescription: string = '';
    
    @Length(1, 2000)
    customExcerpt: string = '';
}