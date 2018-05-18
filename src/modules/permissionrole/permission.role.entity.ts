import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class PermissionRole {

  @PrimaryColumn({ type: 'varchar', length: 30 })
  private id: string;

  @Column({ type: 'varchar', length: 30 })
  private role_id: string;

  @Column({ type: 'varchar', length: 30 })
  private permission_id: string;
}