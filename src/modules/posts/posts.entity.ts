import { Entity, PrimaryColumn, Column } from 'typeorm';
import { PostStatus } from '../common/const/PostConst';

@Entity()
export class Posts {

  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 2000 })
  public title: string;

  @Column({ type: 'text', default: null })
  public html: string | null;

  @Column({ type: 'text', default: null })
  public plaintext: string | null;

  @Column({ type: 'varchar', default: null })
  public feature_image: string | null;

  @Column({ type: 'tinyint', default: 0 })
  public featured: number;

  @Column({ type: 'varchar', length: 50, default: 'draft' })
  public status: string;

  @Column({ type: 'varchar', length: 50, default: 'public' })
  public visibility: string;

  @Column({ type: 'varchar', length: 2000, default: null })
  public meta_title: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  public meta_description: string | null;

  @Column({ type: 'varchar', length: 50 })
  public author_id: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: string;

  @Column({ type: 'varchar', length: 50 })
  public created_by: string;

  @Column({ type: 'datetime', default: null })
  public updated_at: string | null;

  @Column({ type: 'varchar', length: 50, default: null })
  public updated_by: string | null;

  @Column({ type: 'datetime', default: null })
  public published_at: string | null;

  @Column({ type: 'varchar', length: 50, default: null })
  public published_by: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  public custom_excerpt: string | null;
}