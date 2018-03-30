import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Roles {
  
  @PrimaryColumn({ type: 'varchar', length: 30 })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
  created_at?: string;

  @Column({ type: 'varchar', length: 30 })
  created_by: string;

  @Column({ type: 'datetime', default: null })
  updated_at?: string | null;

  @Column({ type: 'varchar', length: 30, default: null })
  updated_by?: string | null;
}