import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Invites {

  @PrimaryColumn({ type: 'varchar', length: 30 })
  id: string;

  @Column({ type: 'varchar', length: 30 })
  role_id: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'varchar', length: 191 })
  token: string;

  @Column({ type: 'varchar', length: 191 })
  email: string;

  @Column({ type: 'bigint' })
  expires: number;

  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
  created_at: string;

  @Column({ type: 'varchar', length: 30 })
  created_by: string;

  @Column({ type: 'datetime', default: null })
  updated_at: string | null;

  @Column({ type: 'varchar', length: 30, default: null })
  updated_by: string | null;
}