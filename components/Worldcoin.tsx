import { WorldIDWidget } from "@worldcoin/id";

const Verify = () => {
  // get user from global state

  const completeVerification = async (verificationResponse) => {
    console.log(verificationResponse);

    // Append User with worldcoin hash
    // worldcoin_hash: verificationResponse.nullifier_hash,

  };

  return (
    <>
      <div className="container">

        <div className="flex flex-col gap-3 mb-16 mt-[6.5rem] ">
          <p className="text-3xl">Verify that you're human</p>
          <p>
            To avoid spam and fake accounts we integrate with Worldcoin to
            verify that you are a human being.
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
            I don't have a Worldcoin account
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
