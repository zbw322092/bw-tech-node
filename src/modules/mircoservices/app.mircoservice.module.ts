import { Module } from '@nestjs/common';
import { FakerModule } from './faker/faker.module';

@Module({
  imports: [FakerModule]
})
export class AppMicroserviceModule {}