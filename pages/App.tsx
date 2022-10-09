import { useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/web3auth';
import {
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from '@web3auth/base';
import RPC from '../components/web3RPC'; // for using web3.js
// import RPC from "./ethersRPC"; // for using ethers.js
import useStore from '../Utils/store';

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  VStack,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import Worldcoin from '../components/Worldcoin';

<Link>Chakra UI</Link>;

const clientId =
  'BOEGk24qBxVg9qe0z7wr_Wa5gaec_tOzUCuqnDr6z1Yp0IEtqIvgNt7gDfcZnoCRVn94jGMcGx5ZGUQQRALOMag'; // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  const setWallet = useStore((store: any) => store.setWallet);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x1',
            rpcTarget: 'https://rpc.ankr.com/eth', // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.COINBASE]: {
              label: 'Coinbase',
              showOnModal: true,
            },
            openlogin: {
              label: 'null',
              showOnModal: false,
            },
          },
        });
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connect();
    setWallet(web3authProvider);
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };
  const loggedInView = (
    <>
      <button onClick={getUserInfo} className="card">
        Get User Info
      </button>
      <button onClick={getChainId} className="card">
        Get Chain ID
      </button>
      <button onClick={getAccounts} className="card">
        Get Accounts
      </button>
      <button onClick={getBalance} className="card">
        Get Balance
      </button>
      <button onClick={sendTransaction} className="card">
        Send Transaction
      </button>
      <button onClick={signMessage} className="card">
        Sign Message
      </button>
      <button onClick={getPrivateKey} className="card">
        Get Private Key
      </button>
      <button onClick={logout} className="card">
        Log Out
      </button>

      <div id="console" style={{ whiteSpace: 'pre-line' }}>
        <p style={{ whiteSpace: 'pre-line' }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <Button
      style={{
        colorScheme: 'white',
        width: '150px',
        height: '70px',
        color: 'black',
        border: 'black',
      }}
      onClick={login}
    >
      Login
    </Button>
  );
  // <div className="grid">{provider ? loggedInView : unloggedInView}</div>;

  return (
  
    <div
      className="container"
      style={{ background: '#0BAB9E', width: '100% ' }}
    >
      <img
        src="/Zenmo brand M.svg"
        alt=""
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '50%',
        }}
      ></img>
    <div className="container">
      <h1 className="title">
        <Link target="_blank" href="http://web3auth.io/" rel="noreferrer">
          Web3Auth
        </Link>
        & ReactJS Example
      </h1>
      <Worldcoin />

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>

      <footer className="footer" style={{ color: 'blue' }}>
        <a
          href="https://github.com/zenmo-bogota/zenmo-core"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </div>
  );

  //   <Container
  //     background="#0BAB9E"
  //     style={{
  //       paddingLeft: '0',
  //       paddingRight: '0',
  //     }}
  //   >
  //     <Flex>
  //       <VStack>
  //         <Image src="/Zenmo brand.svg" alt="" />
  //         <Box style={{ margin: 0, width: '100vw !important' }}>
  //           {provider ? loggedInView : unloggedInView}
  //         </Box>
  //         <Button
  //           style={{
  //             colorScheme: 'white',
  //             width: '150px',
  //             height: '70px',
  //             color: 'black',
  //             border: 'black',
  //           }}
  //           onClick={login}
  //         >
  //           Login
  //         </Button>
  //         <Link href="https://github.com/zenmo-bogota/zenmo-core" isExternal>
  //           Source Code <ExternalLinkIcon mx="2px" />
  //         </Link>
  //       </VStack>
  //     </Flex>
  //   </Container>
  // );
}

export default App;
