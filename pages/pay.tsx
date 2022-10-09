/* eslint-disable react/no-children-prop */
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
  InputGroup,
  InputLeftAddon,
  Button,
  Stack,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import useStore from '../Utils/store';
import RPC from '../components/web3RPC'; // for using web3.js

const getBalance = async () => {
  if (!storeProvider) {
    console.log('storeProvider not initialized yet');
    return;
  }
  const rpc = new RPC(storeProvider);
  const balance = await rpc.getBalance();
  setBalance(balance);
  console.log('HERE IS THE BALANCE', balance);
};

const getAccounts = async () => {
  if (!storeProvider) {
    console.log('provider not initialized yet');
    return;
  }
  const rpc = new RPC(storeProvider);
  const address = await rpc.getAccounts();
  setStoreWallet(address);

  const ethersprovider = new ethers.providers.Web3Provider(window.ethereum);

  const ens = await ethersprovider.lookupAddress(address);

  if (ens) {
    setENS(ens);
  } else {
    console.log('no ens name found');
  }

  console.log(address);

  return address;
};

const Pay = () => {
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState(null);
  const [destination, setDestination] = useState(null);

  const storeAztecAccount = useStore((state: any) => state.storeAztecAccount);
  const storeWallet = useStore((state: any) => state.storeWallet);
  const setStoreWallet = useStore((state: any) => state.setStoreWallet);
  const storeRandoName = useStore((state: any) => state.storeRandoName);
  const setStoreRandoName = useStore((state: any) => state.setStoreRandoName);
  const storageClient = useStore((state: any) => state.storageClient);
  const storeProvider = useStore((state: any) => state.storeProvider);
  const initProvider = useStore((state: any) => state.initProvider);
  const incognito = useStore((state: any) => state.incognito);
  const setENS = useStore((state: any) => state.setENS);
  const ensName = useStore((state: any) => state.setENS);

  const getBalance = async () => {
    if (!storeProvider) {
      console.log('storeProvider not initialized yet');
      return;
    }
    const rpc = new RPC(storeProvider);
    const balance = await rpc.getBalance();
    setBalance(balance);
    console.log('HERE IS THE BALANCE', balance);
  };

  const getAccounts = async () => {
    if (!storeProvider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(storeProvider);
    const address = await rpc.getAccounts();
    setStoreWallet(address);

    const ethersprovider = new ethers.providers.Web3Provider(window.ethereum);

    const ens = await ethersprovider.lookupAddress(address);

    if (ens) {
      setENS(ens);
    } else {
      console.log('no ens name found');
    }

    console.log(address);

    return address;
  };

  const sendTransaction = async () => {
    const details = {
      amount,
      destination,
    };
    if (!storeProvider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(storeProvider);
    const receipt = await rpc.sendTransaction(details);
    console.log(receipt);
  };

  const handleAmount = (e) => {
    console.log('i am e', e);
    setAmount(e.target.value);
  };

  const handleDestination = (e) => {
    setAmount(e.target.value);
  };
  useEffect(() => {
    console.log('here is the storeProvider', storeProvider);
    if (!storeProvider) {
      initProvider();
    }
    getBalance();
    getAccounts();
  }, [storeProvider]);
  return (
    <Layout>
      <Container>
        <Grid style={{ height: '60vh' }}>
          <Heading textAlign="center" margin="20">
            Send Money
          </Heading>
          <GridItem>
            <Stack spacing={3}>
              <InputGroup>
                <InputLeftAddon children="Ξ" />
                <Input
                  onChange={(e) => handleAmount(e.value)}
                  placeholder="ETH"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="For" />
                <Input placeholder="Reason for sending" />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="To" />
                <Input
                  onChange={(e) => handleDestination(e.value)}
                  placeholder="wallet address, ens name, etc."
                />
              </InputGroup>
            </Stack>
          </GridItem>
          <Button
            onClick={() => sendTransaction()}
            colorScheme="teal"
            variant="solid"
            margin="10"
          >
            Pay
          </Button>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Pay;
