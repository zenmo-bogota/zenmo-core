// store/store.js
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Web3Storage } from 'web3.storage';
import { Web3Auth } from '@web3auth/web3auth';
import {
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from '@web3auth/base';
import RPC from '../components/web3RPC';

const clientId =
  'BOEGk24qBxVg9qe0z7wr_Wa5gaec_tOzUCuqnDr6z1Yp0IEtqIvgNt7gDfcZnoCRVn94jGMcGx5ZGUQQRALOMag'; // get from https://dashboard.web3auth.io
// create store
const useStore = create(
  persist(
    (set, get) => ({
      // State Variables
      wallet: null,
      worldcoinHash: '',
      worldcoinModal: false,
      storeWallet: null,
      storeAztecAccount: null,
      storeWeb3auth: null,
      storeProvider: null,
      w3name: null,
      storeRandoName: null,
      incognito: false,
      ensName: null,

      //State methods
      // setWallet: (userWallet) => {
      //   set({ wallet: userWallet });
      // },
      setWorldcoinHash: async (hash) => {
        set({ worldcoinHash: hash });
      },

      //State methods
      setStoreWallet: (userWallet) => {
        set({ storeWallet: userWallet });
      },
      setStoreAztecAccount: async (account) => {
        set({ storeAztecAccount: account });
      },
      setStoreWeb3auth: (auth) => {
        set({ storeWeb3auth: auth });
      },
      setStoreProvider: (provider) => {
        set({ storeProvider: provider });
      },
      setWorldcoinModal: (bool) => {
        set({ worldcoinModal: bool });
      },
      setStoreRandoName: (name: string) => {
        set({ storeRandoName: name });
      },
      setHash: async (hash) => {
        set({ worldcoinHash: hash });
      },
      setENS: async (name) => {
        set({ ensName: name });
      },

      storageClient: async () => {
        console.log('here is the apikey', process.env.WEB3_STORAGE_API_KEY);
        try {
          const storageClient = await new Web3Storage({
            token: process.env.WEB3_STORAGE_API_KEY,
          });
          return storageClient;
        } catch (err) {
          return err;
        }
      },

      initProvider: async () => {
        try {
          const web3auth = new Web3Auth({
            clientId,
            chainConfig: {
              chainNamespace: CHAIN_NAMESPACES.EIP155,
              chainId: '0x1',
              rpcTarget: 'https://rpc.ankr.com/eth', // This is the public RPC we have added, please pass on your own endpoint while creating an app
            },
          });

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
            get().setStoreProvider(web3auth.provider);
          }
        } catch (error) {
          console.error(error);
        }
      },

      // checkW3Name: async () => {

      // },

      //examples

      // color: 'white',

      // changeColor: () =>
      //   set((state) => ({ color: state.color === 'white' ? '#212529' : 'white' })),
      // fetch: async (pond) => {
      //   const response = await fetch(pond)
      //   set({ fishies: await response.json() })
      // },
    }),
    {
      name: 'zenmo-storage', // unique name
      partialize: (state: any) => ({
        storeAztecAccount: state.storeAztecAccount,
        storeRandoName: state.storeRandoName,
        storeWallet: state.storeWallet,
        worldcoinHash: state.worldcoinHash,
      }),
      // getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
      // serialize: (state) => btoa(JSON.stringify(state)),
      // deserialize: (str) => JSON.parse(atob(str)),
    }
  )
);
export default useStore;
