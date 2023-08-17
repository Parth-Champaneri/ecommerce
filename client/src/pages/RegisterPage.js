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
} from '@chakra-ui/react';
import axios from 'axios';
// https://ecommerce-test.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=6pidkt6mt2om9qrc7e3lufi79r&redirect_uri=https://www.google.com
function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Required';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      // Call API to register
      try {
        const response = await axios.post(
          `https://ecommerce-test.auth.us-east-2.amazoncognito.com/signUp`,
          {
            ClientId: '6pidkt6mt2om9qrc7e3lufi79r',
            Username: formData.email,
            Password: formData.password,
            UserAttributes: [
              {
                Name: 'email',
                Value: formData.email,
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Allow-Headers': 'Content-Type',
            },
          },
        );
        console.log('Registration successful:', response.data);
        // Redirect user to a confirmation page or directly log them in
      } catch (error) {
        console.error('Error registering:', error.response.data);
        // Handle the error, maybe set it in the state to display to the user
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
          <Text fontSize="2xl">Register</Text>
        </Box>
        <Box my={4} textAlign="left">
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
            <FormControl mt={6} isInvalid={errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>
            <Button width="full" mt={4} type="submit" colorScheme="teal">
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default RegisterPage;
