import { NestFactory } from "@nestjs/core";
import { AppMicroserviceModule } from "./modules/mircoservices/app.mircoservice.module";
import { Transport } from "@nestjs/common/enums/transport.enum";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppMicroserviceModule, {
    transport: Transport.TCP,
    port: 8000
  });

  await app.listen(() => { console.log('microservices is listening on port 8000'); })
}

bootstrap();