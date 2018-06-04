import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { FakerController } from './faker.controller';

@Module({
  controllers: [FakerController]
})
export class FakerModule {}