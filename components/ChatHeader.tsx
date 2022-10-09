import {
  Container,
  Grid,
  GridItem,
  Flex,
  Avatar,
  AvatarBadge,
  Box,
} from '@chakra-ui/react';

//Mock data
const mockdata = [
  {
    groupID: 1,
    groupName: 'Bogota Trip',
  },
];

//Data mapping function
const mapped = mockdata.map((group) => (
  <>
    <Box key={group.groupName}>{group.groupName}</Box>
  </>
));

const Header = () => {
  return (
    <Container>
      <Grid>
        <GridItem>
          <Flex w="100%">
            <Avatar size="lg" src="../Group 2.svg">
              <AvatarBadge boxSize="1.25em" />
            </Avatar>
            <Flex flexDirection="column" mx="5" justify="center">
              <Grid fontSize={40}>{mapped}</Grid>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Header;
