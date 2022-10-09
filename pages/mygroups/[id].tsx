import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Spacer,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import CreateGroup from '../../components/CreateGroup';
import Layout from '../../components/Layout';

//header

//individual group items to map over

//mock data
const users = [
  {
    name: 'Deepak',
    rollNo: '123',
  },
  {
    name: 'Yash',
    rollNo: '124',
  },
  {
    name: 'Raj',
    rollNo: '125',
  },
  {
    name: 'Rohan',
    rollNo: '126',
  },
  {
    name: 'Puneet',
    rollNo: '127',
  },
  {
    name: 'Vivek',
    rollNo: '128',
  },
  {
    name: 'Aman',
    rollNo: '129',
  },
];

//Data mapping function
const mapped = users.map((user) => (
  <>
    <Box key={user.name}>{user.name}</Box>
    <Box key={user.rollNo}>{user.rollNo}</Box>
  </>
));

const Groups = ({ groupData }) => {
  // fetch groups
  return (
    <Layout>
      <Container>
        <Grid>
          {/* header components */}
          <GridItem>
            <Flex
              minWidth="max-content"
              alignItems="center"
              gap="2"
              marginBottom={50}
            >
              <Box p="2">
                <Heading size="md">Circles</Heading>
              </Box>
              <Spacer />
              <Input placeholder="Search" />
              <Box p="2">
                <CreateGroup />
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
            {/* mapped data */}
            <GridItem>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                {mapped}
              </VStack>
            </GridItem>
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};

Groups.getInitialProps = async (ctx) => {
  // fetch group data
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const json = await res.json();
  return {
    groupData: [
      {
        groupId: 1,
        users: ['address1', '0x6a226ad92182E2885c9A7220c393f0dF9772C68D'],
        expensePosts: [
          {
            Amount: '10.00',
            User: '0x6a226ad92182E2885c9A7220c393f0dF9772C68D',
            Note: 'its so inexpensive here',
          },
        ],
        chat: {
          groupWalletAddress: '0x6a226ad92182E2885c9A7220c393f0dF9772C68D',
        },
      },
    ],
  };
};

export default Groups;
