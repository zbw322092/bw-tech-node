import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './modules/app.module';
import { HttpRequestInterceptor } from './modules/common/interceptors/HttpRequestInterceptor';
const port = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalInterceptors(new HttpRequestInterceptor());
  await app.listen(port, () => { console.log(`App is listening on port ${port}`) });
}

bootstrap();