import { IsInt, Min, Max } from 'class-validator';

export class GeneratePostsDto {
  @IsInt()
  @Min(1)
  @Max(10000)
  public amount: number = 0;
}