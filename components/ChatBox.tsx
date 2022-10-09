import { Flex, Divider } from '@chakra-ui/react';
import { useState } from 'react';
import Header from './ChatHeader';
import ChatMessage from './ChatMessage';
import Messages from './Messages';

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: 'computer', text: 'Hi, see you in Eth Bogota' },
    { from: 'me', text: 'OMG I am so excited' },
    { from: 'me', text: 'Me too! Did you book the hotel' },
    {
      from: 'computer',
      text: 'Yes, it was $500 for the week',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages((old) => [...old, { from: 'me', text: data }]);
    setInputMessage('');

    setTimeout(() => {
      setMessages((old) => [...old, { from: 'computer', text: data }]);
    }, 1000);
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex w={['100%', '100%', '40%']} h="90%" flexDir="column">
        <Header />
        <Divider />
        <Messages messages={messages} />
        <Divider />
        <ChatMessage
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Flex>
  );
};

export default Chat;
