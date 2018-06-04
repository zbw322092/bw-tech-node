import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Tags {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 150 })
  public name: string;

  @Column({ type: 'varchar', length: 500, default: null })
  public description: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  public feature_image: string | null;

  @Column({ type: 'varchar', length: 50, default: null })
  public parent_id: string | null;

  @Column({ type: 'varchar', length: 50 })
  public visibility: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  public meta_title: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  public meta_description: string | null;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: string;

  @Column({ type: 'varchar', length: 50 })
  public created_by: string;

  @Column({ type: 'datetime', default: null })
  public updated_at: string | null;

  @Column({ type: 'varchar', length: 50, default: null })
  public updated_by: string | null;
}