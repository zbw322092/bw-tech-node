import { Module, Component } from '@nestjs/common';
import { createConnection, Connection, EntityManager, Repository, ObjectType } from 'typeorm';
import { TypeOrmDatabaseConfig } from './typeOrm.database.config';

@Component()
export class TypeOrmDatabaseService {

  private dbConnection: Connection;

  constructor(private readonly databaseConfig: TypeOrmDatabaseConfig) {}

  private get connection(): Promise<Connection> {
    // return connection if exists
    if (this.dbConnection) { return Promise.resolve(this.dbConnection); }

    return createConnection(this.databaseConfig.getConfiguration()).then((connection) => {
      this.dbConnection = connection;
      return connection;
    }).catch((error) => {
      throw error;
    });
  }

  /**
   * An async getter for the entity manager
   */
  public async getEntityManager(): Promise<EntityManager> {
    return (await this.connection).manager;
  }

  /**
   * An async getter for repositories
   * @param entityClassOrName 
   */
  public async getRepository<T>(entityClassOrName: ObjectType<T> | string): Promise<Repository<T>> {
    return (await this.connection).getRepository<T>(entityClassOrName);
  }
}