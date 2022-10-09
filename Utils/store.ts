// store/store.js
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Web3Storage } from 'web3.storage';
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

      //State methods
      // setWallet: (userWallet) => {
      //   set({ wallet: userWallet });
      // },
      setWorldcoinHash: (hash) => {
        set({ worldcoinHash: hash, worldcoinModal: false });
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
      }),
      // getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
      // serialize: (state) => btoa(JSON.stringify(state)),
      // deserialize: (str) => JSON.parse(atob(str)),
    }
  )
);
export default useStore;
