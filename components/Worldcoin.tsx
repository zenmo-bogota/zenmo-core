import { WorldIDWidget } from "@worldcoin/id";
import useStore from '../Utils/store';

const Verify = () => {
  // get user from global state
  const setWorldcoinHash = useStore(
    (store: any) => store.worldcoin_hash
  );

  const completeVerification = async (verificationResponse) => {
    console.log(verificationResponse);

    // Append User with worldcoin hash
    setWorldcoinHash(verificationResponse.nullifier_hash)

  };

  return (
    <>
      <div className="container">

        <div className="flex flex-col gap-3 mb-16 mt-[6.5rem] ">
          <p className="text-3xl">Verify your proof of humanhood</p>
          <p>
            To avoid bots and spam, zenmo partners with worldcoin to help verify real humanhood through biometrics!
          </p>
        </div>

        <div className="flex flex-col items-center">
          <WorldIDWidget
            actionId="wid_5e992e67b57992e677dcfa6159909e3d"
            signal="zenmo"
            // signal={account}
            enableTelemetry
            onSuccess={(verificationResponse) =>
              completeVerification(verificationResponse)
            } 
            onError={(error) => console.error(error)}
          />
          <div className="mt-12">
            I don't have Worldcoin
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
