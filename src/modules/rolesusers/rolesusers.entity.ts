import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class RolesUsers {

  @PrimaryColumn({ type: 'varchar', length: 30 })
  id: string;

  @Column({ type: 'varchar', length: 30 })
  role_id: string;

  @Column({ type: 'varchar', length: 30 })
  user_id: string;
}