import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Invites {

  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 50 })
  public role_id: string;

  @Column({ type: 'varchar', length: 50 })
  public status: string;

  @Column({ type: 'varchar', length: 300 })
  public token: string;

  @Column({ type: 'varchar', length: 191 })
  public email: string;

  @Column({ type: 'bigint' })
  public expires: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: string;

  @Column({ type: 'varchar', length: 50 })
  public created_by: string;

  @Column({ type: 'datetime', default: null })
  public updated_at: string | null;

  @Column({ type: 'varchar', length: 50, default: null })
  public updated_by: string | null;
}