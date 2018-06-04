import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class RolesUsers {

  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 50 })
  public role_id: string;

  @Column({ type: 'varchar', length: 50 })
  public user_id: string;
}