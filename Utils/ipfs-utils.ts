import * as Name from 'w3name';
// import { create } from 'ipfs-core';

// export const ipfsNode = async () => {
//   // return 'work in progress';
//   try {
//     const node = await create();
//     const nodeId = await node.id();
//     const nodeVersion = await node.version();
//     const nodeIsOnline = node.isOnline();
//     return node;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const makeObjectFile = async (data) => {
  // You can create File objects from a Blob of binary data
  // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

  const file = new File([blob], data.name);

  return file;
};
