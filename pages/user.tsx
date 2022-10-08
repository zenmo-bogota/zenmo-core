import {
  Center,
  Button,
  Container,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Web3Storage } from 'web3.storage';

const User = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [creatingGroup, setCreatingGroup] = useState(false);
  //create Group

  const createGroup = async () => {
    // start loading while we create the group in web3.storage
    setCreatingGroup(true);

    setCreatingGroup(false);
    router.push(`/group/${id}`);
  };

  return (
    <Container>
      <Center>
        <Grid>
          <GridItem>
            <Button>Contacts</Button>
          </GridItem>
          <GridItem>
            <Button onClick={() => onOpen()}>New Group</Button>
          </GridItem>
        </Grid>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter a new group name!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid>
                <GridItem>
                  <Input />
                </GridItem>
              </Grid>
            </ModalBody>

            <Center>
              <ModalFooter>
                {creatingGroup ? (
                  <Spinner />
                ) : (
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => createGroup()}
                  >
                    Create
                  </Button>
                )}
              </ModalFooter>
            </Center>
          </ModalContent>
        </Modal>
      </Center>
    </Container>
  );
};

export default User;
