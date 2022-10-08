// TODO: Setup DAI Contract

// TODO: Get DAI ABI, DAI ADDRESS
const daiABI = require("./DAI.json")["abi"];
const daiAddress = require("./DAI.json")["address"];
const daiContract = new web3.eth.Contract(daiABI, daiAddress);

// TODO: Get DAI Balance smart daiContract call (balanceOf)
export const getBalanceOf = async (address) => {
  const balance = await daiContract.methods.balanceOf(address).call();
  return balance;
};

// TODO: Setup Transfer Function for DAI (safeTransferFrom/transferFrom/transfer)
export const transferDAI = async (to, amount,address) => {
  return daiContract.methods.transfer(to, amount).send({from:address});
};

// Approve max amount of DAI to stakingContract
export const approveDAI = async () => {
  await daiContract.methods
    .approve(
      stakingAddress,
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    )
    .call();
};

// TODO: Setup Transfer Function for DAI (safeTransferFrom/transferFrom/transfer)
export const enableYield = async () => {
  await stakingContract.methods.startloanDAI().call();
};

// TODO: Setup Transfer Function for DAI (safeTransferFrom/transferFrom/transfer)
export const disableYield = async () => {
  await stakingContract.methods.stopLoanDAI().call();
};

const sendTransaction = async () => {
  const publicAddress = (await web3.eth.getAccounts())[0];
  const txnParams = {
    from: publicAddress,
    to: publicAddress,
    value: web3.utils.toWei("0.01", "ether"),
    gasPrice: web3.utils.toWei("30", "gwei"),
  };
  web3.eth
    .sendTransaction(txnParams)
    .on("transactionHash", (hash) => {
      console.log("the txn hash that was returned to the sdk:", hash);
    })
    .then((receipt) => {
      console.log("the txn receipt that was returned to the sdk:", receipt);
    })
    .catch((error) => {
      console.log(error);
    });
};
