import { Get, Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketController implements  OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server; // Adicione esta linha para injetar o servidor WebSocket

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('chatMessage')
  handleChatMessage(@MessageBody() payload: any, @ConnectedSocket() client: Socket): void {
    // Lógica para lidar com mensagens do chat

    // Simula um processamento assíncrono (pode ser uma operação de banco de dados, etc.)
    setTimeout(() => {
      // Envie uma confirmação de volta para o cliente
      client.emit('chatMessageAcknowledgment', 'Mensagem recebida com sucesso');
    }, 1000);

    // Certifique-se de que a propriedade 'server' está definida no seu objeto 'this'
    if (this.server) {
      // Envie a mensagem para todos os clientes conectados (com exceção do remetente)
      this.server.emit('chatMessage', payload);
    } else {
      console.error('Propriedade "server" não está definida no objeto "this".');
    }
  }
 
}