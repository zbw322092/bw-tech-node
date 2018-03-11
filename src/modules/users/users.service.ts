import { Component } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeOrm.database.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Service } from '../database/service.interface';

@Component()
export class UsersService implements Service<User> {

  constructor(private databaseService: TypeOrmDatabaseService) {}

  private get repository(): Promise<Repository<User>> {
    return this.databaseService.getRepository(User);
  }

  // Create
  public async add(user: User): Promise<User> {
    return (await this.repository).save(user);
  }

  public async addAll(users: User[]): Promise<User[]> {
    return (await this.repository).save(users);
  }

  // Retrieve
  public async get(id: string): Promise<User> {
    return (await this.repository).findOneById(id);
  }

  public async getAll(): Promise<User[]> {
    return (await this.repository).find();
  }

  // Update
  public async update(user: User): Promise<User> {
    return (await this.repository).save(user);
  }

  // Delete
  public async remove(user: User): Promise<User> {
    return (await this.repository).remove(user);
  }

}