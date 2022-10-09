/* eslint-disable react/jsx-no-undef */
import {
  Flex,
  Avatar,
  AvatarBadge,
  Box,
  Grid,
  Input,
  Button,
  Container,
  GridItem,
} from '@chakra-ui/react';

import Chat from '../../components/ChatBox';
import Layout from '../../components/Layout';

// const Group = ({ groupData }) => {
//   // fetch group info by id

//   // add group members

//   // update group running total

//   //send chat message
//   return <div>{groupData}</div>;
// };

const chatApp = () => {
  return (
    <Layout>
      <Container>
        <Grid>
          <GridItem>
            <Chat />
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};

// Group.getInitialProps = async (ctx) => {
//   // fetch group data
//   const res = await fetch('https://api.github.com/repos/vercel/next.js');
//   const json = await res.json();
//   return {
//     groupData: [
//       {
//         groupId: 1,
//         users: ['address1', '0x6a226ad92182E2885c9A7220c393f0dF9772C68D'],
//         expensePosts: [
//           {
//             Amount: '10.00',
//             User: '0x6a226ad92182E2885c9A7220c393f0dF9772C68D',
//             Note: 'its so inexpensive here',
//           },
//         ],
//         chat: {
//           groupWalletAddress: '0x6a226ad92182E2885c9A7220c393f0dF9772C68D',
//         },
//       },
//     ],
//   };
// };

export default chatApp;
