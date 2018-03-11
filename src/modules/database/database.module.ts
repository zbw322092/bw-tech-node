import { Module } from '@nestjs/common';
import { TypeOrmDatabaseService } from './typeOrm.database.service';

@Module({
  components: [TypeOrmDatabaseService],
  exports: [TypeOrmDatabaseService]
})

export class DatabaseModule {}