import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  Container,
} from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <>
      <Box
        bg="#0BAB9E"
        w="100%"
        p={4}
        color="white"
        fontFamily="Mulish"
        fontWeight="bold"
        fontSize="40"
        textTransform="lowercase"
        ml="2"
        textAlign="center"
      >
        zenmo
      </Box>
      {children}
      <Container>
        <Box bg="white" w="100%" p={4}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <Flex w="100%">
              <Image boxSize="150px" src="/home.svg" alignContent="center" />
            </Flex>
            <Flex w="100%">
              <Image boxSize="150px" src="/pay.svg" alignContent="center" />
            </Flex>
            <Flex w="100%">
              <Image boxSize="150px" src="/circles.svg" alignContent="center" />
            </Flex>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Layout;
