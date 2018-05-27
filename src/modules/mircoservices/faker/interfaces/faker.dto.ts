import { IsInt, Min, Max } from "class-validator";

export class GeneratePostsDto {
  @IsInt()
  @Min(1)
  @Max(10000)
  amount: number = 0;
}