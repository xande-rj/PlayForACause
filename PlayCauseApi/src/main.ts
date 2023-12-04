import { NestFactory } from '@nestjs/core';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { MySocketModule } from './app/socket/socket.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


async function bootstrap() {
  const app = await NestFactory.create(UsuariosModule);
  const corsOptions: CorsOptions = {
        origin: "*", // Habilita todos os origens
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
      };
    app.enableCors(corsOptions);
  await app.listen(3001);

}

bootstrap();

// async function bootstrap2() {
//   const app = await NestFactory.create(MySocketModule);

//   const corsOptions: CorsOptions = {
//     origin: "*", // Habilita todos os origens
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
//     allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
//   };
//   
//   await app.listen(3333);

// }

// bootstrap2();