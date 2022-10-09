import { ZenmoLogo } from './ZenmoLogo';
import {
    Box,
    Button,
    Center,
    Circle,
    Icon,
    Text,
    VStack
  } from '@chakra-ui/react';

import Zenmo from '../public/zenmo.svg'
  
  const Header = () => {
    return (
      <Box bgColor={"#0BAB9E"} w="100" h='calc(100vh)'>
        <VStack>
            <Center color='white'>
                <Text fontSize='6xl' color='#fff'>zenmo</Text>
            </Center>
            <Center color='white'>
                <Text fontSize='2xl' color='#fff'>send money with ease</Text>
            </Center>
            <Center color='white'>
                <Button>
                    <Circle size='100px' bg='white' color='white' boxShadow='lg'>
                        <ZenmoLogo boxSize={50}  />
                    </Circle>
                </Button>
            </Center>
        </VStack>


      </Box>
    )
  };
  
  export default Header;
  