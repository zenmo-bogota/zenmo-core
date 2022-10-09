/* eslint-disable react/no-children-prop */
import {
  Container,
  Grid,
  GridItem,
  Flex,
  Heading,
  Spacer,
  Input,
  Box,
  VStack,
  Badge,
  StackDivider,
  Text,
  InputGroup,
  InputLeftAddon,
  Button,
  Stack,
} from '@chakra-ui/react';
import Layout from '../components/Layout';

const pay = () => {
  return (
    <Layout>
      <Container>
        <Grid>
          <Heading textAlign="center" margin="20">
            Send Money
          </Heading>
          <GridItem>
            <Stack spacing={3}>
              <InputGroup>
                <InputLeftAddon children="$" />
                <Input placeholder="USD" />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="For" />
                <Input placeholder="Reason for sending" />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="To" />
                <Input placeholder="Add username" />
              </InputGroup>
            </Stack>
          </GridItem>
          <Button colorScheme="teal" variant="solid" margin="10">
            Pay
          </Button>
        </Grid>
      </Container>
    </Layout>
  );
};

export default pay;
