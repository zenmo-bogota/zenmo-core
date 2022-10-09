// store/store.js
import create from 'zustand';
import { persist } from 'zustand/middleware';
// create store
const useStore = create(
  persist(
    (set, get) => ({
      // State Variables
      storeWallet: null,
      storeAztecAccount: null,
      storeWeb3auth: null,
      storeProvider: null,

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
      }),
      // getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
      // serialize: (state) => btoa(JSON.stringify(state)),
      // deserialize: (str) => JSON.parse(atob(str)),
    }
  )
);
export default useStore;
