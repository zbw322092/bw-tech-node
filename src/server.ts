import { NestFactory } from '@nestjs/core'
import 'reflect-metadata';
import { ApplicationModule } from './modules/app/app.module';

import express = require('express');
import * as bodyParser from 'body-parser';

const expressInstance = express();
expressInstance.use(bodyParser.json());

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, expressInstance);
  await app.listen(3333, () => {console.log(`Application is listening on port 3333.`);} );
}

bootstrap();