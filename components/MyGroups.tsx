import {
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Heading,
  Box,
  Button,
  ButtonGroup,
  Spacer,
  IconButton,
} from '@chakra-ui/react';

const MyGroups = () => {
  // fetch groups by id
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md">Chakra App</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <IconButton aria-label="Search" />
        <Button colorScheme="teal">Log in</Button>
      </ButtonGroup>
    </Flex>
  );
};

export default MyGroups;
