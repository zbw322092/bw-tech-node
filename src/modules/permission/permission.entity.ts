import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Permission {

	constructor($id: string, $name: string, $permission_type: string, $action_type: string, $created_at: number, $created_by: string, $updated_at: number , $updated_by: string ) {
		this.id = $id;
		this.name = $name;
		this.permission_type = $permission_type;
		this.action_type = $action_type;
		this.created_at = $created_at;
		this.created_by = $created_by;
		this.updated_at = $updated_at;
		this.updated_by = $updated_by;
	}
  

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