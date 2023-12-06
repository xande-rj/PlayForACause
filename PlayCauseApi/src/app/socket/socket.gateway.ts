import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketController implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(@MessageBody() payload: { username: string }, @ConnectedSocket() client: Socket): void {
    client.join('chatRoom');
      console.log(`Usuário ${payload.username} entrou na sala`);

      this.server.to('chatRoom').emit('userJoined', { username: payload.username });
    }

  @SubscribeMessage('chatMessage')
  handleChatMessage(@MessageBody() payload: any, @ConnectedSocket() client: Socket): void {
    this.server.to('chatRoom').emit('chatMessage', payload,client.id);
  }
}