import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class PermissionRole {

	constructor($id: string, $role_id: string, $permission_id: string) {
		this.id = $id;
		this.role_id = $role_id;
		this.permission_id = $permission_id;
	}

  @PrimaryColumn({ type: 'varchar', length: 30 })
  private id: string;

  @Column({ type: 'varchar', length: 30 })
  private role_id: string;

  @Column({ type: 'varchar', length: 30 })
  private permission_id: string;
}