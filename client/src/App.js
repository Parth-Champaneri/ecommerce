import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import { AuthProvider } from './services/AuthContext';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import PrivateRoute from './pages/PrivateRoute';
import Navigation from './components/Navbar';

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

export default App;
