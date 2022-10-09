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
import { createAztecSdk, EthersAdapter, SdkFlavour } from '@aztec/sdk';
import { EthAddress, GrumpkinAddress } from '@aztec/barretenberg/address';
import { useRouter } from 'next/router';

const clientId =
  'BOEGk24qBxVg9qe0z7wr_Wa5gaec_tOzUCuqnDr6z1Yp0IEtqIvgNt7gDfcZnoCRVn94jGMcGx5ZGUQQRALOMag'; // get from https://dashboard.web3auth.io

function App() {
  const router = useRouter();
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  const setStoreWallet = useStore((store: any) => store.setStoreWallet);
  const setStoreWeb3Auth = useStore((store: any) => store.setStoreWeb3Auth);
  const setStoreProvider = useStore((store: any) => store.setStoreProvider);
  const setStoreAztecAccount = useStore(
    (store: any) => store.setStoreAztecAccount
  );
  const storeAztecAccount = useStore((store: any) => store.storeAztecAccount);

  const setupAztec = async () => {
    console.log('setupAztec running');
    //@ts-ignore
    if (!window.ethereum) {
      alert('no window.ethereum?');
      return;
    }

    let networkData = [
      {
        chainId: '0xa57ec',

        chainName: 'Aztec Testnet',

        rpcUrls: ['https://aztec-connect-testnet-eth-host.aztec.network:8545'],

        nativeCurrency: {
          name: 'Ether',

          symbol: 'ETH',

          decimals: 18,
        },
      },
    ];
    try {
      if (
        web3auth?.provider &&
        setStoreProvider &&
        storeAztecAccount === null
      ) {
        if (
          //@ts-ignore
          window.ethereum.chainId !== '0xa57ec' ||
          //@ts-ignore
          window.ethereum.chainId !== '0x677868'
        ) {
          //@ts-ignore
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',

            params: networkData,
          });
        }

        console.log('---- begin SDK ----');

        const sdk = await createAztecSdk(provider, {
          serverUrl: 'https://api.aztec.network/aztec-connect-testnet/falafel', // testnet
          pollInterval: 1000,
          memoryDb: true, // set to false to save chain data
          debug: 'bb:*', // print debug logs
          flavour: SdkFlavour.PLAIN, // Use PLAIN with Nodejs
          minConfirmation: 1, // ETH block confirmations
        });

        console.log('here is the sdk', sdk);

        const userAddress = await getAccounts();

        console.log('here is the userAddress', userAddress);

        const { publicKey, privateKey } = await sdk.generateAccountKeyPair(
          userAddress as EthAddress
        );

        const aztecAccount = {
          publicKey,
          privateKey,
          sdk,
        };

        console.log('here is the aztecAccount', aztecAccount);

        let account = await sdk.getUser(publicKey);

        if (account.id === null) {
          account = await sdk.addUser(privateKey);
        }

        console.log('Aztec account', account);

        await setStoreAztecAccount({ GrumpkinAddress: account.id });

        await account.awaitSynchronised();
        console.log(' setStoreProvider ', setStoreProvider);
        console.log(' storeAztecAccount', setStoreAztecAccount);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          setStoreProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (storeAztecAccount.GrumpkinAddress) {
      router.push(`/user/`);
    }
  }, [storeAztecAccount]);

  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connect();
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
    return address;
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
      <button onClick={() => setupAztec()} className="card">
        setupAztec
      </button>

      <div id="console" style={{ whiteSpace: 'pre-line' }}>
        <p style={{ whiteSpace: 'pre-line' }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
          Web3Auth
        </a>
        & ReactJS Example
      </h1>

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/Web3Auth/tree/master/examples/react-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </div>
  );
}

export default App;
