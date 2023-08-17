import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
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

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/">Products</Link>
              </li>
            </ul>
          </nav> */}
          <Flex as="nav" px={150} py={4}>
            <Heading size="lg">the qWoah!</Heading>
            <Spacer />
            <Box display="flex" alignItems="center">
              <HStack spacing={8}>
                <Button as={Link} to="/" variant="link">
                  Login
                </Button>
                <Button as={Link} to="/register" variant="link">
                  Register
                </Button>
                <Button as={Link} to="/products" variant="link">
                  Products
                </Button>
              </HStack>
            </Box>
          </Flex>

          <Flex px={150}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/products" element={<ProductsPage />} />
            </Routes>
          </Flex>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
