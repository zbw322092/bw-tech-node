import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Posts {

  @PrimaryColumn({ type: 'varchar', length: 30 })
  id: string;

  @Column({ type: 'varchar', length: 30 })
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

  @Column({ type: 'varchar', length: 30 })
  author_id: string;

  @Column({ type: 'datetime' })
  created_at: string;

  @Column({ type: 'varchar', length: 30 })
  created_by: string;

  @Column({ type: 'datetime', default: null })
  updated_at: string | null;

  @Column({ type: 'varchar', length: 30, default: null })
  updated_by: string | null;

  @Column({ type: 'datetime', default: null })
  published_at: string | null;

  @Column({ type: 'varchar', length: 30, default: null })
  published_by: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  custom_excerpt: string | null;
}