export class TagsInfo {
  public tag_id: string;
  public tag_name: string;
}

export class PostsInfo {
  public id: string;
  public title: string;
  public html: string;
  public plaintext: string;
  public feature_image: string | null;
  public featured: number;
  public status: string;
  public meta_title: string | null;
  public meta_description: string | null;
  public author_id: string;
  public created_at: string;
  public created_by: string;
  public updated_at: string | null;
  public updated_by: string | null;
  public published_at: string | null;
  public published_by: string | null;
  public custom_excerpt: string | null;
  public tagsInfo?: TagsInfo[];
}

export class GetPostsVo {
  public posts: PostsInfo[];
}