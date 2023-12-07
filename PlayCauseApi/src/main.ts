import { NestFactory } from '@nestjs/core';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const port = process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(UsuariosModule);
  const corsOptions: CorsOptions = {
        origin: "*", // Habilita todos os origens
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
      };
    app.enableCors(corsOptions);
  await app.listen(port);

}

bootstrap();

