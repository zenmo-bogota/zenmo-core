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
} from '@chakra-ui/react';
import Layout from '../components/Layout';

//mock data
const user = [
  {
    username: 'Diane',
    balance: '$100',
  },
];

const txns = [
  {
    user: 'John',
    note: 'Pizza',
    amount: '$20',
  },
  {
    user: 'Jill',
    note: 'Burgers',
    amount: '$15',
  },
  {
    user: 'Sarah',
    note: 'Wine',
    amount: '$50',
  },
  {
    user: 'David',
    note: 'Tacos',
    amount: '$10',
  },
];

//Data mapping function
const mapped = user.map((user) => (
  <>
    <Box key={user.username}>{user.username}</Box>
    <Box key={user.balance}>{user.balance}</Box>
  </>
));

const txnmapped = txns.map((txns) => (
  <>
    <Grid>
      <GridItem key={txns.user}>
        <Text as="b">{txns.user}</Text>
      </GridItem>
      <GridItem key={txns.note}>
        <Text color="grey">{txns.note}</Text>
      </GridItem>
    </Grid>
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem colStart={4} colEnd={6} key={txns.amount}>
        {txns.amount}
      </GridItem>
    </Grid>
  </>
));

const home = () => {
  return (
    <Layout>
      <Container>
        <Grid>
          {/* header components */}
          <GridItem>
            <Flex minWidth="max-content" gap="2" marginBottom={50}></Flex>
          </GridItem>
        </Grid>

        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6">
            <Box display="flex" alignItems="center">
              <Box
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="lg"
                textTransform="uppercase"
                ml="2"
              ></Box>
            </Box>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            ></Box>
            <Box>
              <Box as="span" fontSize="lg">
                {mapped}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Heading p="2" color="#285E61">
            Transactions
          </Heading>
        </Box>
        <GridItem>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            {txnmapped}
          </VStack>
        </GridItem>
      </Container>
    </Layout>
  );
};

export default home;
