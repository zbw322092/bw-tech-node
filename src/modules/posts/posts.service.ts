import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Posts } from "./posts.entity";
import { Repository } from "typeorm/repository/Repository";
import { CreatePostDto } from "./interface/posts.dto";
import { uniqid } from "../../utils/uniqid";
import { IdPrefix } from "../common/const/IdPrefix";

@Component()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>
  ) {}

  public async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }

  public async createPost(session: any, createPostDto: CreatePostDto): Promise<any> {
    // const post = new Posts();
    // post.setId = uniqid(IdPrefix.Post);
    // post.setTitle = createPostDto.title;
    // post.setHtml = createPostDto.html;
    // post.setPlaintext = createPostDto.plaintext;
    // post.setFeatureImage = createPostDto.featureImage;
    // post.setFeatured = createPostDto.featured;
    // post.setStatus = createPostDto.status;
    // post.setVisibility = createPostDto.visibility;
    // post.setMetaTitle = createPostDto.metaTitle;
    // post.setMetaDescription = createPostDto.metaDescription;
  }
}