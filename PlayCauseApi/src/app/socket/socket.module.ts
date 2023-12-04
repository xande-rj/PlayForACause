// socket.module.ts
import { Module } from '@nestjs/common';
import { SocketController } from './socket.gateway';

@Module({
  imports: [],
  providers: [SocketController],
})
export class MySocketModule {}
