export class TagsInfo {
  tag_id: string;
  tag_name: string;
}

export class PostsInfo {
  id: string;
  title: string;
  html: string;
  plaintext: string;
  feature_image: string | null;
  featured: number;
  status: string;
  meta_title: string | null;
  meta_description: string | null;
  author_id: string;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
  published_at: string | null;
  published_by: string | null;
  custom_excerpt: string | null;
  tagsInfo?: Array<TagsInfo>;
}

export class GetPostsVo {
  posts: Array<PostsInfo>
}