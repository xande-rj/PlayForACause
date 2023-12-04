"use client" 

import { ChakraProvider, CSSReset, Box, Flex, VStack, HStack, Text, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {  Link, useParams } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';  // Importe o tipo Socket do socket.io-client
import  * as uuid from 'uuid';



interface Message{
  id: string;
  name : string;
  text: string;
}

interface Payload{
  name : string;
  text: string;
}

//const socket = 

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);  // Defina o tipo como Socket | null

  useEffect(() => {
    const newSocket =io('http://localhost:3333', { transports: ['websocket'] });

    newSocket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO');
    });

    newSocket.on('chatMessage', (message) => {
      // Adiciona a mensagem ao estado apenas se for confirmado pelo servidor
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Desconectado do servidor Socket.IO', reason);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Erro de conexão com o servidor Socket.IO', error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && inputMessage.trim() !== '') {
      // Enviar a mensagem para o servidor com um callback de confirmação
      socket.emit('chatMessage', inputMessage, (acknowledgment: string) => {
        // O acknowledgment é enviado pelo servidor
        if (acknowledgment === 'Mensagem recebida com sucesso') {
          console.log('Mensagem entregue com sucesso');
          // Limpar o campo de entrada após a entrega bem-sucedida
          setInputMessage('');
        } else {
          console.error('Falha ao entregar a mensagem');
        }
      });
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Enviar Mensagem</button>
      </div>
    </div>
  );
  // const [title] = useState('Chat Web');
  // const [name, setName] = useState('alexandre');
  // const [text, setText] = useState('');
  // const [messages, setMessages] = useState<Message[]>([]);


  
  // useEffect(() => {
    

  //   socket.on('connect', () => {
  //     console.log('Conectado ao servidor Socket.IO');

  //   });

    
  //   function receivedMessage(message: Payload) {
  //     const newMessage: Message = {
  //       id: uuid.v4(),
  //       name: message.name,
  //       text: message.text,
  //     };
  //     setMessages([...messages, newMessage]);
  //   }

  //   socket.on('msgToClient', (message: Payload) => {
  //     receivedMessage(message);
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };

  
  // }, [messages, name, text]);
  
  // function sendMessage() {
  //     const message: Payload = {
  //       name,
  //       text,
  //   }   
  //    console.log(message)

  //   socket.emit('msgToServer', message);
  //     setText('');
  // }
  

  // const {username} = useParams()

  // return (
  
  
  //   <ChakraProvider>
  //     <CSSReset />
  //     <Flex height="100vh">
  //       {/* Lateral Esquerda - Lista de Usuários Recentes */}
  //       <VStack width="25%" bg="gray.200" p={4} align="stretch">
  //         <Text fontSize="xl" fontWeight="bold" mb={4}>Usuários Recentes</Text>
  //         {/* Exemplo de lista de usuários recentes */}
  //         <Text>Usuário 1</Text>
  //         <Text>Usuário 2</Text>
  //         <Text>Usuário 3</Text>
  //         <Text>Usuário 4</Text>

  //         {/* Link de retorno */}
  //         <Link to="/">
  //           <Text mt={4} fontSize="md" fontWeight="bold" color="teal.500">Voltar</Text>
  //         </Link>
  //       </VStack>

  //       {/* Área Central - Chat */}
  //       <Box flex="1" p={4} bg="white">
  //         {/* Exemplo de chat */}
  //         <Box mb={4}>
  //           <Text fontWeight="bold"
  //           >{username}</Text>
  //          {messages.map((message, index) => (
  //         <div key={index}>{message.text}</div>
  //       ))}
  //         </Box>
  //         <Box mb={4}>
  //           <Text fontWeight="bold">{username}</Text>
  //           <Text>
  //           {messages.map(message => {
  //             if (message.name === name) {
  //               return (
  //                 <Text key={message.id}>
  //                   <span>
  //                     {message.name}
  //                     {' diz:'}
  //                   </span>

  //                   <p>{message.text}</p>
  //                 </Text>
  //               );
  //             }

  //             return (
  //               <Text key={message.id}>
  //                 <span>
  //                   {message.name}
  //                   {' diz:'}
  //                 </span>

  //                 <p>{message.text}</p>
  //               </Text>
  //             );
  //           })}
  //         </Text>
  //         </Box>
  //         {/* Área de Digitação e Botão de Envio */}
  //         <HStack mt={4}>
  //           <Input placeholder="Digite sua mensagem..." flex="1" mr={2} value={text} onChange={e=> setText(e.target.value)}/>
  //           <Button colorScheme="teal" onClick={()=> {sendMessage()}}>Enviar</Button>
  //         </HStack>
  //       </Box>
  //     </Flex>
  //   </ChakraProvider>
  // );
}

export default Chat;
