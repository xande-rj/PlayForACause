"use client" 

import { ChakraProvider, CSSReset, Box, Flex, VStack, HStack, Text, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {  Link, useParams } from 'react-router-dom';
import io from "socket.io-client"
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



function Chat() {
  const [title] = useState('Chat Web');
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);


  // useEffect(() => {
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
  // }, [messages, name, text]);

  // function validateInput() {
  //   return name.length > 0 && text.length > 0;
  // }

  // function sendMessage() {
  //   if (validateInput()) {
  //     const message: Payload = {
  //       name,
  //       text,
  //     };

  //     socket.emit('msgToServer', message);
  //     setText('');
  //   }
  // }
  const {username} = useParams()

  return (
  
  
    <ChakraProvider>
      <CSSReset />
      <Flex height="100vh">
        {/* Lateral Esquerda - Lista de Usuários Recentes */}
        <VStack width="25%" bg="gray.200" p={4} align="stretch">
          <Text fontSize="xl" fontWeight="bold" mb={4}>Usuários Recentes</Text>
          {/* Exemplo de lista de usuários recentes */}
          <Text>Usuário 1</Text>
          <Text>Usuário 2</Text>
          <Text>Usuário 3</Text>
          <Text>Usuário 4</Text>

          {/* Link de retorno */}
          <Link to="/">
            <Text mt={4} fontSize="md" fontWeight="bold" color="teal.500">Voltar</Text>
          </Link>
        </VStack>

        {/* Área Central - Chat */}
        <Box flex="1" p={4} bg="white">
          {/* Exemplo de chat */}
          <Box mb={4}>
            <Text fontWeight="bold"
            >{username}</Text>
            <Text>
    {messages.map(message => {
      if (message.name === name) {
        return (
          <Text key={message.id}>
            <span>
              {message.name}
              {' diz:'}
            </span>

            <p>{message.text}</p>
          </Text>
        );
      }

      return (
        <Text key={message.id}>
          <span>
            {message.name}
            {' diz:'}
          </span>

          <p>{message.text}</p>
        </Text>
      );
    })}
    </Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">{username}</Text>
            <Text>Estou bem, obrigado! E você?</Text>
          </Box>

          {/* Área de Digitação e Botão de Envio */}
          <HStack mt={4}>
            <Input placeholder="Digite sua mensagem..." flex="1" mr={2} value={text} onChange={e=> setText(e.target.value)}/>
            <Button colorScheme="teal" onClick={()=> {}}>Enviar</Button>
          </HStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Chat;
