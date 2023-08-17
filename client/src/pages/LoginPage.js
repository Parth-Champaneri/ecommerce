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
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import axios from 'axios';
const poolData = {
  UserPoolId: 'us-east-2_9XSZ40qu5',
  ClientId: '6pidkt6mt2om9qrc7e3lufi79r',
};
const userPool = new CognitoUserPool(poolData);

function LoginPage() {
  const [formData, setFormData] = useState({
    email: 'parth.champaneri@hotmail.com',
    password: 'Pass@321',
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
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      try {
        const email = encodeURIComponent(formData.email);
        const password = encodeURIComponent(formData.password);

        const response = await axios.post(
          `https://6cl8w2orii.execute-api.us-east-2.amazonaws.com/test/1login`,
          {
            ClientId: '6pidkt6mt2om9qrc7e3lufi79r',
            AuthFlow: 'USER_PASSWORD_AUTH',
            AuthParameters: {
              USERNAME: formData.email,
              PASSWORD: formData.password,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } catch (error) {
        console.error('Error logging in:', error.response.data);
        // Handle the error, maybe set it in the state to display to the user
      }
      // Call API TO LOGIN
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
            <Button width="full" mt={4} type="submit" colorScheme="teal">
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default LoginPage;
