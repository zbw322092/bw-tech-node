import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class RolesUsers {

  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  role_id: string;

  @Column({ type: 'varchar', length: 50 })
  user_id: string;
}