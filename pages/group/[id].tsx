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
  return { groupData: json.groupData };
};

export default Group;
