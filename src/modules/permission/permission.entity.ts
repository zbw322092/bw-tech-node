import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Permission {

  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  permission_type: string;

  @Column({ type: 'varchar', length: 200 })
  action_type: string;

  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
  created_at: string;

  @Column({ type: 'varchar', length: 50 })
  created_by: string;

  @Column({ type: 'datetime', default: null })
  updated_at: string | null;

  @Column({ type: 'varchar', length: 50, default: null })
  updated_by: string | null;
}