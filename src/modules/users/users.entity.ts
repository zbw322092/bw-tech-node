import { Entity, Column, PrimaryColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
export class Users {

  @PrimaryColumn({ type: 'varchar', length: 30 })
  id: string;

  @Column({ type: 'varchar', length: 191, default: null })
  name: string | null;

  @Column({ type: 'varchar', length: 191, default: null })
  slug: string | null;

  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Column({ type: 'varchar', length: 191 })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 2000, default: null })
  profile_image: string|null;

  @Column({ type: 'varchar', length: 2000, default: null })
  cover_image: string|null;

  @Column({ type: 'text', default: null })
  bio: string|null;

  @Column({ type: 'varchar', length: 2000, default: null })
  website: string|null;

  @Column({ type: 'text', default: null })
  location: string|null;

  @Column({ type: 'varchar', length: 2000, default: null })
  facebook: string|null;

  @Column({ type: 'varchar', length: 2000, default: null })
  twitter: string|null;

  @Column({ type: 'varchar', length: 50, default: 'active'})
  status: string;

  @Column({ type: 'varchar', length: 2000, default: null })
  meta_title: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  meta_description: string | null;

  @Column({ type: 'datetime', default: null })
  last_seen: string|null;

  @Column({ type: 'datetime' })
  created_at: string;

  @Column({ type: 'varchar', length: 30 })
  created_by: string;

  @Column({ type: 'datetime', default: null })
  updated_at: string|null;

  @Column({ type: 'varchar', length: 30, default: null })
  updated_by: string|null;
}