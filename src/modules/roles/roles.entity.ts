import { Entity, PrimaryColumn, Column } from "typeorm";
import { getNowDatetime } from "../../utils/timeHandler";

@Entity()
export class Roles {
  
  @PrimaryColumn({ type: 'varchar', length: 24 })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
  created_at?: string;

  @Column({ type: 'varchar', length: 24 })
  created_by: string;

  @Column({ type: 'datetime', default: null })
  updated_at?: string | null;

  @Column({ type: 'varchar', length: 24, default: null })
  updated_by?: string | null;
}