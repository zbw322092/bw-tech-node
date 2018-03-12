import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Posts {
  constructor(id: string, uuid: string, title: string, slug: string, mobiledoc: string | null,
    html: string | null, plaintext: string | null, feature_image: string | null, featured: string,
    page: string, status: string, visibility: string, meta_title: string | null,
    meta_description: string | null, author_id: string | null, created_at: number, created_by: string,
    updated_at: number | null, updated_by: string | null, published_at: number | null, published_by: string | null,
    custom_excerpt: string | null
  ) {
    this.id = id;
    this.uuid = uuid;
    this.title = title;
    this.slug = slug;
    this.mobiledoc = mobiledoc;
    this.html = html;
    this.plaintext = plaintext;
    this.feature_image = feature_image;
    this.featured = featured;
    this.page = page;
    this.status = status;
    this.visibility = visibility;
    this.meta_title = meta_title;
    this.meta_description = meta_description;
    this.author_id = author_id;
    this.created_at = created_at;
    this.created_by = created_by;
    this.updated_at = updated_at;
    this.updated_by = updated_by;
    this.published_at = published_at;
    this.published_by = published_by;
    this.custom_excerpt = custom_excerpt;
  }

  @PrimaryColumn({ type: 'varchar', length: 24 })
  id: string;

  @Column({ type: 'varchar', length: 24 })
  uuid: string;

  @Column({ type: 'varchar', length: 2000 })
  title: string;

  @Column({ type: 'varchar', length: 191 })
  slug: string;

  @Column({ type: 'text', default: null })
  mobiledoc: string | null;

  @Column({ type: 'text', default: null })
  html: string | null;

  @Column({ type: 'text', default: null })
  plaintext: string | null;

  @Column({ type: 'varchar', default: null })
  feature_image: string | null;

  @Column({ type: 'tinyint', default: '0' })
  featured: string;

  @Column({ type: 'tinyint', default: '0' })
  page: string;

  @Column({ type: 'varchar', length: 50, default: 'draft' })
  status: string;

  @Column({ type: 'varchar', length: 50, default: 'public' })
  visibility: string;

  @Column({ type: 'varchar', length: 2000, default: null })
  meta_title: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  meta_description: string | null;

  @Column({ type: 'varchar', length: 24 })
  author_id: string;

  @Column({ type: 'datetime' })
  created_at: number;

  @Column({ type: 'varchar', length: 24 })
  created_by: string;

  @Column({ type: 'datetime', default: null })
  updated_at: number | null;

  @Column({ type: 'varchar', length: 24, default: null })
  updated_by: string | null;

  @Column({ type: 'datetime', default: null })
  published_at: number | null;

  @Column({ type: 'varchar', length: 24, default: null })
  published_by: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  custom_excerpt: string | null;
}