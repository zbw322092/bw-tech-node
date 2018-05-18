import { Length, IsInt } from "class-validator";

export class CreatePostDto {
    @Length(1, 1000)
    readonly title = '';

    readonly html = '';

    readonly plaintext = '';

    @Length(1, 255)
    readonly featureImage = ''

    @IsInt()
    readonly featured;

    @Length(1, 255)
    readonly status = '';

    @Length(1, 50)
    readonly visibility = '';

    @Length(1, 2000)
    readonly metaTitle = '';

    @Length(1, 2000)
    readonly metaDescription = '';
    
    @Length(1, 2000)
    readonly customExcerpt = '';
}