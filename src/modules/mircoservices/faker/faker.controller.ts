import { Controller } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';
import { GeneratePostsDto } from "./interfaces/faker.dto";
import { AddPostDto } from "../../posts/interface/posts.dto";
import { PostStatus, PostVisibility } from "../../common/const/PostConst";
const faker = require('faker') as Faker.FakerStatic;

@Controller()
export class FakerController {

  private randomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  @MessagePattern({ cmd: 'faker_generate_posts' })
  public generatePosts(generatePostsDto: GeneratePostsDto): Array<AddPostDto> {
    const amount = generatePostsDto.amount || 0;
    const dataArr: Array<AddPostDto> = [];
    for (let i = 0; i < amount; i++) {
      const introPargraph = faker.lorem.paragraph(10);
      const mainParagraph = faker.lorem.paragraph(50);
      const postInstance: AddPostDto = {
        title: faker.lorem.words(5),
        html: `<div class="post-container"><p class="intro">${ introPargraph }</p><p class="main-content">${ mainParagraph }</p></div>`,
        plaintext: introPargraph + ' ' + mainParagraph,
        featureImage: faker.image.imageUrl(),
        featured: [0, 1][this.randomInt(2)],
        status: ['published', 'draft', 'featured'][this.randomInt(3)] as PostStatus,
        visibility: ['public', 'private'][this.randomInt(2)] as PostVisibility,
        metaTitle: [faker.lorem.words(5), null][this.randomInt(2)],
        metaDescription: [faker.lorem.sentences(3), null][this.randomInt(2)],
        customExcerpt: [faker.lorem.sentences(3), null][this.randomInt(2)]
      }
      dataArr.push(postInstance);
    }

    return dataArr;
  }
}