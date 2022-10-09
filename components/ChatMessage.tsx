/* eslint-disable react/no-children-prop */
import { Flex, Input, Button, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const Message = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (
    <Flex w="100%" mt="5">
      <Text fontSize="30px">🤑</Text>
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: '1px solid black',
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        bg="#0BAB9E"
        color="white"
        borderRadius="none"
        _hover={{
          bg: 'white',
          color: 'white',
          border: '1px solid black',
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};

export default Message;
