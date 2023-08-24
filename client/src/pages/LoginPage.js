import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Alert,
  AlertDescription,
} from '@chakra-ui/react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/AuthServices';

function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: 'parth.champaneri@hotmail.com',
    password: 'Password@123',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Required';
    }
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await loginUser(formData.email, formData.password);
        login(response.data.AuthenticationResult.IdToken);
      } catch (error) {
        setApiError(
          error?.response?.data?.message || 'An unexpected error occurred.',
        );
      }
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Flex pt="30" width="100%" alignItems="center" justifyContent="center">
      <Box p={8} width="400px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Text fontSize="2xl">Login</Text>
        </Box>
        <Box my={4} textAlign="center">
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl mt={6} isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            {apiError && (
              <Alert status="error" mt={4}>
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}
            <Button width="full" mt={4} type="submit" colorScheme="teal">
              Login
            </Button>
            <Button
              width="full"
              my={4}
              as={Link}
              to="/register"
              colorScheme="teal"
              variant="outline"
            >
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default LoginPage;
