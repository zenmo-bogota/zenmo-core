// store/store.js
import create from 'zustand';
import { persist } from 'zustand/middleware'
// create store
const useStore = create(persist(set, get) => ({
  // State Variables
  wallet: null,

  //State methods
  setWallet: (userWallet) => {
    set({ wallet: userWallet });
  },

  //examples

  // color: 'white',

  // changeColor: () =>
  //   set((state) => ({ color: state.color === 'white' ? '#212529' : 'white' })),
  // fetch: async (pond) => {
  //   const response = await fetch(pond)
  //   set({ fishies: await response.json() })
  // },
})));
export default useStore;
