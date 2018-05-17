import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Posts {

  constructor($id: string, $uuid: string, $title: string, $html: string, $plaintext: string, $feature_image: string, $featured: string, $page: string, $status: string, $visibility: string, $meta_title: string, $meta_description: string, $author_id: string, $created_at: string, $created_by: string, $updated_at: string, $updated_by: string, $published_at: string, $published_by: string, $custom_excerpt: string) {
    this.id = $id;
    this.uuid = $uuid;
    this.title = $title;
    this.html = $html;
    this.plaintext = $plaintext;
    this.feature_image = $feature_image;
    this.featured = $featured;
    this.page = $page;
    this.status = $status;
    this.visibility = $visibility;
    this.meta_title = $meta_title;
    this.meta_description = $meta_description;
    this.author_id = $author_id;
    this.created_at = $created_at;
    this.created_by = $created_by;
    this.updated_at = $updated_at;
    this.updated_by = $updated_by;
    this.published_at = $published_at;
    this.published_by = $published_by;
    this.custom_excerpt = $custom_excerpt;
  }

  @PrimaryColumn({ type: 'varchar', length: 30 })
  private id: string;

  @Column({ type: 'varchar', length: 30 })
  private uuid: string;

  @Column({ type: 'varchar', length: 2000 })
  private title: string;

  @Column({ type: 'text', default: null })
  private html: string | null;

  @Column({ type: 'text', default: null })
  private plaintext: string | null;

  @Column({ type: 'varchar', default: null })
  private feature_image: string | null;

  @Column({ type: 'tinyint', default: '0' })
  private featured: string;

  @Column({ type: 'tinyint', default: '0' })
  private page: string;

  @Column({ type: 'varchar', length: 50, default: 'draft' })
  private status: string;

  @Column({ type: 'varchar', length: 50, default: 'public' })
  private visibility: string;

  @Column({ type: 'varchar', length: 2000, default: null })
  private meta_title: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  private meta_description: string | null;

  @Column({ type: 'varchar', length: 30 })
  private author_id: string;

  @Column({ type: 'datetime' })
  private created_at: string;

  @Column({ type: 'varchar', length: 30 })
  private created_by: string;

  @Column({ type: 'datetime', default: null })
  private updated_at: string | null;

  @Column({ type: 'varchar', length: 30, default: null })
  private updated_by: string | null;

  @Column({ type: 'datetime', default: null })
  private published_at: string | null;

  @Column({ type: 'varchar', length: 30, default: null })
  private published_by: string | null;

  @Column({ type: 'varchar', length: 2000, default: null })
  private custom_excerpt: string | null;


  /**
   * Getter getId
   * @return {string}
   */
  public get getId(): string {
    return this.id;
  }

  /**
   * Getter getUuid
   * @return {string}
   */
  public get getUuid(): string {
    return this.uuid;
  }

  /**
   * Getter getTitle
   * @return {string}
   */
  public get getTitle(): string {
    return this.title;
  }

  /**
   * Getter getHtml
   * @return {string }
   */
  public get getHtml(): string {
    return this.html;
  }

  /**
   * Getter getPlaintext
   * @return {string }
   */
  public get getPlaintext(): string {
    return this.plaintext;
  }

  /**
   * Getter getFeatureImage
   * @return {string }
   */
  public get getFeatureImage(): string {
    return this.feature_image;
  }

  /**
   * Getter getFeatured
   * @return {string}
   */
  public get getFeatured(): string {
    return this.featured;
  }

  /**
   * Getter getPage
   * @return {string}
   */
  public get getPage(): string {
    return this.page;
  }

  /**
   * Getter getStatus
   * @return {string}
   */
  public get getStatus(): string {
    return this.status;
  }

  /**
   * Getter getVisibility
   * @return {string}
   */
  public get getVisibility(): string {
    return this.visibility;
  }

  /**
   * Getter getMetaTitle
   * @return {string }
   */
  public get getMetaTitle(): string {
    return this.meta_title;
  }

  /**
   * Getter getMetaDescription
   * @return {string }
   */
  public get getMetaDescription(): string {
    return this.meta_description;
  }

  /**
   * Getter getAuthorId
   * @return {string}
   */
  public get getAuthorId(): string {
    return this.author_id;
  }

  /**
   * Getter getCreatedAt
   * @return {string}
   */
  public get getCreatedAt(): string {
    return this.created_at;
  }

  /**
   * Getter getCreatedBy
   * @return {string}
   */
  public get getCreatedBy(): string {
    return this.created_by;
  }

  /**
   * Getter getUpdatedAt
   * @return {string }
   */
  public get getUpdatedAt(): string {
    return this.updated_at;
  }

  /**
   * Getter getUpdatedBy
   * @return {string }
   */
  public get getUpdatedBy(): string {
    return this.updated_by;
  }

  /**
   * Getter getPublishedAt
   * @return {string }
   */
  public get getPublishedAt(): string {
    return this.published_at;
  }

  /**
   * Getter getPublishedBy
   * @return {string }
   */
  public get getPublishedBy(): string {
    return this.published_by;
  }

  /**
   * Getter getCustomExcerpt
   * @return {string }
   */
  public get getCustomExcerpt(): string {
    return this.custom_excerpt;
  }

  /**
   * Setter setId
   * @param {string} value
   */
  public set setId(value: string) {
    this.id = value;
  }

  /**
   * Setter setUuid
   * @param {string} value
   */
  public set setUuid(value: string) {
    this.uuid = value;
  }

  /**
   * Setter setTitle
   * @param {string} value
   */
  public set setTitle(value: string) {
    this.title = value;
  }

  /**
   * Setter setHtml
   * @param {string } value
   */
  public set setHtml(value: string) {
    this.html = value;
  }

  /**
   * Setter setPlaintext
   * @param {string } value
   */
  public set setPlaintext(value: string) {
    this.plaintext = value;
  }

  /**
   * Setter setFeatureImage
   * @param {string } value
   */
  public set setFeatureImage(value: string) {
    this.feature_image = value;
  }

  /**
   * Setter setFeatured
   * @param {string} value
   */
  public set setFeatured(value: string) {
    this.featured = value;
  }

  /**
   * Setter setPage
   * @param {string} value
   */
  public set setPage(value: string) {
    this.page = value;
  }

  /**
   * Setter setStatus
   * @param {string} value
   */
  public set setStatus(value: string) {
    this.status = value;
  }

  /**
   * Setter setVisibility
   * @param {string} value
   */
  public set setVisibility(value: string) {
    this.visibility = value;
  }

  /**
   * Setter setMetaTitle
   * @param {string } value
   */
  public set setMetaTitle(value: string) {
    this.meta_title = value;
  }

  /**
   * Setter setMetaDescription
   * @param {string } value
   */
  public set setMetaDescription(value: string) {
    this.meta_description = value;
  }

  /**
   * Setter setAuthorId
   * @param {string} value
   */
  public set setAuthorId(value: string) {
    this.author_id = value;
  }

  /**
   * Setter setCreatedAt
   * @param {string} value
   */
  public set setCreatedAt(value: string) {
    this.created_at = value;
  }

  /**
   * Setter setCreatedBy
   * @param {string} value
   */
  public set setCreatedBy(value: string) {
    this.created_by = value;
  }

  /**
   * Setter setUpdatedAt
   * @param {string } value
   */
  public set setUpdatedAt(value: string) {
    this.updated_at = value;
  }

  /**
   * Setter setUpdatedBy
   * @param {string } value
   */
  public set setUpdatedBy(value: string) {
    this.updated_by = value;
  }

  /**
   * Setter setPublishedAt
   * @param {string } value
   */
  public set setPublishedAt(value: string) {
    this.published_at = value;
  }

  /**
   * Setter setPublishedBy
   * @param {string } value
   */
  public set setPublishedBy(value: string) {
    this.published_by = value;
  }

  /**
   * Setter setCustomExcerpt
   * @param {string } value
   */
  public set setCustomExcerpt(value: string) {
    this.custom_excerpt = value;
  }

}