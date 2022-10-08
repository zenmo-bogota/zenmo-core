import * as Name from 'w3name';
import { create } from 'ipfs-core';

export const ipfsNode = async () => {
  try {
    const node = await create();
    const nodeId = await node.id();
    const nodeVersion = await node.version();
    const nodeIsOnline = node.isOnline();
    return node;
  } catch (err) {
    console.log(err);
  }
};

const utilsNode = ipfsNode();
