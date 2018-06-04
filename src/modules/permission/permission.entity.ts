import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Permission {

  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 200 })
  public name: string;

  @Column({ type: 'varchar', length: 200 })
  public permission_type: string;

  @Column({ type: 'varchar', length: 200 })
  public action_type: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: string;

  @Column({ type: 'varchar', length: 50 })
  public created_by: string;

  @Column({ type: 'datetime', default: null })
  public updated_at: string | null;

  @Column({ type: 'varchar', length: 50, default: null })
  public updated_by: string | null;
}