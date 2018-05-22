import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class PostsTags {  
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  post_id: string;

  @Column({ type: 'varchar', length: 50 })
  tag_id: string;
}