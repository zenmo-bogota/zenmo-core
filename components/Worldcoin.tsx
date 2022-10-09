import { WorldIDWidget } from '@worldcoin/id';
import useStore from '../Utils/store';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
} from '@chakra-ui/react';
import { setgroups } from 'process';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

const Worldcoin = () => {
  const [worldcoinModal, setWorldcoinModal] = useState(false);
  // get user from global state
  const setWorldcoinHash = useStore((store: any) => store.worldcoinHash);
  const setHash = useStore((store: any) => store.setHash);

  // const setWorldcoinModal = useStore((store: any) => store.worldcoinModal);

  // const worldcoinModal = useStore((store: any) => store.worldcoinModal);

  useEffect(() => {
    setWorldcoinModal(true);
  }, []);

  const completeVerification = async (verificationResponse) => {
    console.log(verificationResponse);

    // Append User with worldcoin hash
    try {
      await setHash(verificationResponse.nullifier_hash);
      Router.push('/home');
    } catch (err) {
      console.log('world coin set hash', err);
    }
  };

  return (
    <>
      <Modal isOpen={worldcoinModal} onClose={() => setWorldcoinModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify that you’re human</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            No bots allowed on Zenmo!
            <Center>
              {typeof window !== 'undefined' && (
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
              )}
            </Center>
          </ModalBody>
          <ModalFooter>
            <Link href="/home">I do not have worldcoin</Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Worldcoin;
