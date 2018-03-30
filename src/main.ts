import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { HttpRequestInterceptor } from './modules/common/interceptors/HttpRequestInterceptor';
import { TimeConst } from './modules/common/const/TimeConst';
import { ExpressMysqlSessionConfig } from './config/ExpressMysqlSessionConfig';
import { getConnection } from 'typeorm';
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const port = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalInterceptors(new HttpRequestInterceptor());
  // store session
  const expressMysqlSessionConfig = new ExpressMysqlSessionConfig().getConfig();
  const sessionStore = new MySQLStore(expressMysqlSessionConfig);
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
  await app.listen(port, () => { console.log(`App is listening on port ${port}`) });
}

bootstrap();