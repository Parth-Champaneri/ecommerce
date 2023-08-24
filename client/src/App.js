import React, { createContext, useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import { AuthProvider } from './AuthContext';
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Flex,
  HStack,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import { useAuth } from './AuthContext';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <div>
            <Navigation />
            <Flex px={150}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/products"
                  element={
                    <PrivateRoute>
                      <ProductsPage />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Flex>
          </div>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

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

export default App;
