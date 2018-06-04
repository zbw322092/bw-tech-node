import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { HttpRequestInterceptor } from './modules/common/interceptors/HttpRequestInterceptor';
import { TimeConst } from './modules/common/const/TimeConst';
import nconf from './config/config';
import { connectDatabase } from './db/connections/dbConnection';
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const port = nconf.get('server:port');
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.useGlobalInterceptors(new HttpRequestInterceptor());
  // store session
  const sessionStore = new MySQLStore(nconf.get('expressMysqlSession'));
  app.use(session({
    secret: 'bw-tech',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: false,
      maxAge: TimeConst.day
    }
  }));

  await app.listen(port, () => { console.log(`App is listening on port ${port}`); });
}

bootstrap();