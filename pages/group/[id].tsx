const Group = ({ groupData }) => {
  // fetch group info by id

  // add group members

  // update group running total

  //send chat message
  return <div>{groupData}</div>;
};

Group.getInitialProps = async (ctx) => {
  // fetch group data
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const json = await res.json();
  return {
    groupData: [
      {
        groupId: 1,
        users: ['address1', '0xb6dB965d0041A48C21585F651FE3953F71a37040'],
        expensePosts: [
          {
            Amount: '10.00',
            User: '0xb6dB965d0041A48C21585F651FE3953F71a37040',
            Note: 'its so inexpensive here',
          },
        ],
        chat: {
          groupWalletAddress: '0xb6dB965d0041A48C21585F651FE3953F71a37040',
        },
      },
    ],
  };
};

export default Group;
