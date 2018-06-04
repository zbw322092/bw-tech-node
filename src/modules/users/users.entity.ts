import { Entity, Column, PrimaryColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class Users {

  @PrimaryColumn({ type: 'varchar', length: 50 })
  public id: string;

  @Column({ type: 'varchar', length: 191, default: null })
  public name: string | null;

  @Column({ type: 'varchar', length: 60 })
  public password: string;

  @Column({ type: 'varchar', length: 191 })
  @IsEmail()
  public email: string;

  @Column({ type: 'varchar', length: 2000, default: null })
  public profile_image: string|null;

  @Column({ type: 'varchar', length: 2000, default: null })
  public cover_image: string|null;

  @Column({ type: 'text', default: null })
  public bio: string|null;

  @Column({ type: 'varchar', length: 2000, default: null })
  public website: string|null;

  @Column({ type: 'text', default: null })
  public location: string|null;

  @Column({ type: 'varchar', length: 2000, default: null })
  public facebook: string|null;

  @Column({ type: 'varchar', length: 2000, default: null })
  public twitter: string|null;

  @Column({ type: 'varchar', length: 50, default: 'active'})
  public status: string;

  @Column({ type: 'varchar', length: 2000, default: null })
  public meta_title: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  public meta_description: string | null;

  @Column({ type: 'datetime', default: null })
  public last_seen: string|null;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: string;

  @Column({ type: 'varchar', length: 50 })
  public created_by: string;

  @Column({ type: 'datetime', default: null })
  public updated_at: string|null;

  @Column({ type: 'varchar', length: 50, default: null })
  public updated_by: string|null;
}