import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Permission {

  @PrimaryColumn({ type: 'varchar', length: 30 })
  private id: string;

  @Column({ type: 'varchar', length: 200 })
  private name: string;

  @Column({ type: 'varchar', length: 200 })
  private permission_type: string;

  @Column({ type: 'varchar', length: 200 })
  private action_type: string;

  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
  private created_at: number;

  @Column({ type: 'varchar', length: 30 })
  private created_by: string;

  @Column({ type: 'datetime', default: null })
  private updated_at: number | null;

  @Column({ type: 'varchar', length: 30, default: null })
  private updated_by: string | null;
}