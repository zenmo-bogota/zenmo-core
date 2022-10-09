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
  useDisclosure,
  SkeletonCircle,
  SkeletonText,
  Center,
  FormControl,
  Switch,
  FormLabel,
} from '@chakra-ui/react';
import Davatar from '@davatar/react';
import { rand } from 'elliptic';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { generateName } from '../Utils/name.js';
import { makeObjectFile } from '../Utils/ipfs-utils';
import useStore from '../Utils/store';
import * as Name from 'w3name';
import { Web3Storage } from 'web3.storage';
import { create } from 'ipfs-core';
import RPC from '../components/web3RPC'; // for using web3.js
import { ethers } from 'ethers';

//mock data
const user = [
  {
    username: 'Diane',
    balance: '$100',
  },
];

const txns = [
  {
    user: 'John',
    note: 'Pizza',
    amount: '$20',
  },
  {
    user: 'Jill',
    note: 'Burgers',
    amount: '$15',
  },
  {
    user: 'Sarah',
    note: 'Wine',
    amount: '$50',
  },
  {
    user: 'David',
    note: 'Tacos',
    amount: '$10',
  },
];

const txnmapped = txns.map((txns) => (
  <>
    <Grid>
      <GridItem key={txns.user}>
        <Text as="b">{txns.user}</Text>
      </GridItem>
      <GridItem key={txns.note}>
        <Text color="grey">{txns.note}</Text>
      </GridItem>
    </Grid>
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem colStart={4} colEnd={6} key={txns.amount}>
        {txns.amount}
      </GridItem>
    </Grid>
  </>
));

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(null);

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

  //Data mapping function
  const Profile = user.map((user) => (
    <>
      {storeProvider ? (
        <Center>
          <Davatar
            size={49}
            address={
              storeWallet || '0xb6dB965d0041A48C21585F651FE3953F71a37040'
            }
            provider={storeProvider} // optional
            generatedAvatarType="jazzicon" // optional, 'jazzicon' or 'blockies'
          />
        </Center>
      ) : null}

      <Box key={user.username}>
        {incognito ? (
          <>
            {typeof storeRandoName === 'string'
              ? storeRandoName
              : user.username}
          </>
        ) : (
          ensName || storeWallet
        )}
      </Box>
      <Box key={user.balance}>{balance ? balance : 'not available'} ETH</Box>
    </>
  ));

  const generateW3Name = async (uid) => {
    try {
      const w3name = await Name.create();
      // const userw3Name = await makeObjectFile({
      //   1: storeWallet,
      //   2: JSON.stringify(AztecSdkUser),
      // });

      // const node = await create({ repo: 'ok' + Math.random() });
      // const nodeId = await node.id();
      // const nodeVersion = await node.version();
      // const nodeIsOnline = node.isOnline();

      const storageClient = await new Web3Storage({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGNGZUY3OGNCZmM0Yzk2NUVGMTU5NDk5RGFGMDA5NTRlMzI1ZDc2N2UiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjUyMDcyNDgzMzAsIm5hbWUiOiJ6ZW5tbyJ9.wrHk2BbRXA93sWWlHEsmq7KcJhD1j8fq4CvtMIeh7Lw',
      });
      console.log('storageClient', storageClient);

      // get ZENMODB

      const zenmoDB = await storageClient.get(
        'bafybeiheecpezhwibmjhgrsxqwrw2xfobr7lwhpixeistpwc33iqhv7lpe'
      );

      const zenmoDBFiles = await zenmoDB.files();
      // const zenmoJSON = await node.get(zenmoDBFiles[0].cid);
      const zenmoRes = await fetch(
        `https://${zenmoDBFiles[0].cid}.ipfs.w3s.link/${zenmoDBFiles[0].name}`
      );
      const zenmoJSON = await zenmoRes.json();

      console.log('this is the ZENMO DB!', zenmoDB);
      console.log('this is the zenmoDBFiles!', zenmoDBFiles);
      console.log('this is the zenmoJSON!', zenmoJSON);

      const testUser = await storageClient.get(
        'bafybeifjhfcfutcsf7cnkcpzpz4too5xdxlk2ivbhmchr4roe2jfrjvuda'
      );

      const testUserFiles = await testUser.files();
      // const testUserJSON = await node.get(zenmoDBFiles[0].cid);

      console.log('this is the testUser DB!', testUser);
      console.log('this is the testUserFiles!', testUserFiles);
      // console.log('this is the testUserJSON!', testUserJSON);

      const zenmoDbUser = await makeObjectFile({
        type: 'zenmoDbUser',
        user: storeWallet,
        w3name: JSON.stringify(w3name),
      });

      console.log('zenmoDbUser file', zenmoDbUser);

      // ----- this is what creates a new user file!!!!

      // const cid = await storageClient.put([zenmoDbUser]);
      // console.log('zenmoDbUser cid', cid);
      // console.log(
      //   'process.env.NEXT_PUBLIC_ZENMO_SECRET',
      //   process.env.NEXT_PUBLIC_ZENMO_SECRET
      // );

      // const cid = await storageClient.put([zenmoDb]);
      // console.log('cid', cid);
      // NEXT_PUBLIC_ZENMO_SECRET
      console.log('w3name', w3name);
      console.log('zenmoDb', zenmoDB);
      return;
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    if (storeRandoName) {
      console.log('now we have a name', storeRandoName);
      setIsLoading(false);
      // generate user web3name db

      // see if there is something
      //  if not make first db commit for user
      generateW3Name(storeWallet);
    } else {
      const randoName = generateName();
      console.log('now we have a randoName', randoName);
      //@ts-ignore
      setStoreRandoName(randoName);
    }

    //get user
  }, [storeRandoName]);

  useEffect(() => {
    console.log('here is the storeProvider', storeProvider);
    if (!storeProvider) {
      initProvider();
    }
    getBalance();
    getAccounts();
  }, [storeProvider]);

  return isloading ? (
    <Layout>
      <Container>
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      </Container>
    </Layout>
  ) : (
    <Layout>
      <Container>
        <Grid>
          {/* header components */}
          <GridItem>
            <Flex minWidth="max-content" gap="2" marginBottom={50}></Flex>
          </GridItem>
        </Grid>

        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6">
            <Box display="flex" alignItems="center">
              <Box
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="lg"
                textTransform="uppercase"
                ml="2"
              ></Box>
            </Box>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            ></Box>
            <Box>
              <Box as="span" fontSize="lg">
                {Profile}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box m="5">
            <FormControl display="flex" alignItems="center">
              <Switch id="email-alerts" />
              <FormLabel htmlFor="email-alerts" mb="0">
                Donate less than 5 USD owed from friends
              </FormLabel>
            </FormControl>
          </Box>
          <Heading p="2" color="#285E61">
            Transactions
          </Heading>
        </Box>
        <GridItem>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            {txnmapped}
          </VStack>
        </GridItem>
      </Container>
    </Layout>
  );
};

export default Home;
