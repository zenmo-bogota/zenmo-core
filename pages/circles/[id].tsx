import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';

const chatClient = new StreamChat('r5e6gmzac9q5');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibGluZ2VyaW5nLWRhd24tMCJ9.G3q0XkWAxDx8oENO36XCRKxobj4MDZjepouQbbL3yVI';

chatClient.connectUser(
  {
    id: 'lingering-dawn-0',
    name: 'dope.eth',
    image: 'https://getstream.io/random_png/?id=lingering-dawn-0&name=lingering-dawn-0',
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'custom_channel_id', {
  // add as many custom fields as you'd like
  image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.aqua-adventures.com%2Flesson%2Ftandem-kayak-rental%2F&psig=AOvVaw3vEkGBKiHNuR2WOvWDpNI_&ust=1665404094291000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNjE2O6P0_oCFQAAAAAdAAAAABAE',
  name: 'Broke Ape Kayak Club',
  members: ['lingering-dawn-0'],
});

const Circle = () => (
  <Chat client={chatClient} >
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default Circle;














// //header
// const client = StreamChat.getInstance("a4qzpbx2n4cp");

// await client.connectUser(
//   {
//       id: 'jlahey',
//       name: 'Jim Lahey',
//       image: 'https://i.imgur.com/fR9Jz14.png',
//   },
//  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicmVkLXdhdGVyLTkifQ.85ZL_U4TYueYJV3OuY-8RbSvnVjzPbY3EbY-TcP88oE",
// )

// // OR create a channel by providing list of members for that channel.
// // In this case, id will be auto-generated on backend side


// const text = 'I’m mowing the air Randy, I’m mowing the air.';

// const response = await channel.sendMessage({
//     text,
//     customField: '123',
// });



// // fetch the channel state, subscribe to future updates
// await channel.watch();

// //individual group items to map over

// //mock data
// const users = [
//   {
//     name: 'Deepak',
//     rollNo: '123',
//   },
//   {
//     name: 'Yash',
//     rollNo: '124',
//   },
//   {
//     name: 'Raj',
//     rollNo: '125',
//   },
//   {
//     name: 'Rohan',
//     rollNo: '126',
//   },
//   {
//     name: 'Puneet',
//     rollNo: '127',
//   },
//   {
//     name: 'Vivek',
//     rollNo: '128',
//   },
//   {
//     name: 'Aman',
//     rollNo: '129',
//   },
// ];

// //Data mapping function
// const mapped = users.map((user) => (
//   <>
//     <Box key={user.name}>{user.name}</Box>
//     <Box key={user.rollNo}>{user.rollNo}</Box>
//   </>
// ));

// const Groups = ({ groupData }) => {
//   // fetch groups
//   return (
//     <Layout>
//       <Container>
//         <Grid>
//           {/* header components */}
//           <GridItem>
//             <Flex
//               minWidth="max-content"
//               alignItems="center"
//               gap="2"
//               marginBottom={50}
//             >
//               <Box p="2">
//                 <Heading size="md">Circles</Heading>
//               </Box>
//               <Spacer />
//               <Input placeholder="Search" />
//               <Box p="2">
//                 <CreateGroup />
//               </Box>
//             </Flex>
//           </GridItem>
//           <GridItem>
//             {/* mapped data */}
//             <GridItem>
//               <VStack
//                 divider={<StackDivider borderColor="gray.200" />}
//                 spacing={4}
//                 align="stretch"
//               >
//                 {mapped}
//               </VStack>
//             </GridItem>
//           </GridItem>
//         </Grid>
//       </Container>
//     </Layout>
//   );
// };

// Groups.getInitialProps = async (ctx) => {
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

// export default Groups;
