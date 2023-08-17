import React from 'react';
import { Box, Flex, Heading, Link, Spacer } from '@chakra-ui/react';

function Navbar() {
  return (
    <Flex as="nav" padding="1.5rem" bg="teal.500" color="white">
      <Heading size="md">My Website</Heading>
      <Spacer />
      <Box display="flex" alignItems="center">
        <Link marginRight="1rem" href="#">
          Link 1
        </Link>
        <Link marginRight="1rem" href="#">
          Link 2
        </Link>
        <Link href="#">Link 3</Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
