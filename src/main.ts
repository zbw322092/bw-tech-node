import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
const port = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  // app.use((req, res, next) => {
  //   req.url = req.url + 'auth/signup';
  //   next();
  // });
  await app.listen(port, () => { console.log(`App is listening on port ${port}`) });
}

bootstrap();