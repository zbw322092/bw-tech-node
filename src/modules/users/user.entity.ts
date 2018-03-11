import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

  constructor(id: string, name: string, slug: string, password: string, email: string,
    profile_image: string|null, cover_image: string|null, bio: string|null, website: string|null,
    location: string|null, facebook: string|null, twitter: string|null, status: string, visibility: string,
    meta_title: string|null, meta_description: string|null, last_seen: number|null, created_at: number,
    created_by: string, updated_at: number|null, updated_by: string|null) {
      this.id = id;
      this.name = name;
      this.slug = slug;
      this.password = password;
      this.email = email;
      this.profile_image = profile_image;
      this.cover_image = cover_image;
      this.bio = bio;
      this.website = website;
      this.location = location;
      this.facebook = facebook;
      this.twitter = twitter;
      this.status = status;
      this.visibility = visibility;
      this.meta_title = meta_title;
      this.meta_description = meta_description;
      this.last_seen = last_seen;
      this.created_at = created_at;
      this.created_by = created_by;
      this.created_at = created_at;
      this.updated_by = updated_by;
  }

  @PrimaryColumn({ type: 'varchar', length: 24 })
  id: string;

  @Column({ type: 'varchar', length: 191 })
  name: string;

  @Column({ type: 'varchar', length: 191 })
  slug: string;

  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Column({ type: 'varchar', length: 191 })
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

  @Column({ type: 'varchar', length: 50, default: 'public'})
  visibility: string;

  @Column({ type: 'varchar', length: 2000, default: null })
  meta_title: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  meta_description: string | null;

  @Column({ type: 'datetime', default: null })
  last_seen: number|null;

  @Column({ type: 'datetime' })
  created_at: number;

  @Column({ type: 'varchar', length: 24 })
  created_by: string;

  @Column({ type: 'datetime', default: null })
  updated_at: number|null;

  @Column({ type: 'varchar', length: 24, default: null })
  updated_by: string|null;
}