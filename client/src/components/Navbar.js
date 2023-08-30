import React from 'react';
import { Box, Button, Flex, HStack, Heading, Spacer } from '@chakra-ui/react';
import { useAuth } from '../services/AuthContext';

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <Flex as="nav" px={150} py={4}>
      <Heading size="lg">the qWoah!</Heading>
      <Spacer />
      <Box display="flex" alignItems="center">
        <HStack spacing={8}>
          {isAuthenticated ? (
            <>
              <Button onClick={logout} variant="link">
                Logout
              </Button>
            </>
          ) : null}
        </HStack>
      </Box>
    </Flex>
  );
};

export default Navigation;
