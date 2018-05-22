import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Tags {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length:150 })
  name: string;

  @Column({ type: 'varchar', length: 500, default: null })
  description: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  feature_image: string | null;

  @Column({ type: 'varchar', length: 50, default: null })
  parent_id: string | null;

  @Column({ type: 'varchar', length: 50 })
  visibility: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  meta_title: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  meta_description: string | null;

  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
  created_at: string;

  @Column({ type: 'varchar', length: 50 })
  created_by: string;

  @Column({ type: 'datetime', default: null })
  updated_at: string | null;

  @Column({ type: 'varchar', length: 50, default: null })
  updated_by: string | null;
}