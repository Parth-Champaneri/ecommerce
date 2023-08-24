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
import { Link, useNavigate } from 'react-router-dom';

import {
  registerUser,
  verifyUser,
  resendVerificationCode,
} from '../services/AuthServices';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'parth.champaneri@hotmail.com',
    password: 'Password@123',
    confirmPassword: 'Password@123',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationStep, setIsVerificationStep] = useState(false);

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
      try {
        await registerUser(formData.email, formData.password);
        setIsVerificationStep(true);
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

  const handleVerification = async () => {
    try {
      await verifyUser(formData.email, verificationCode);
      navigate('/');
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          'An unexpected error occurred during verification.',
      );
    }
  };

  const handleResendCode = async () => {
    try {
      await resendVerificationCode(formData.email);
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          'An unexpected error occurred while resending the code.',
      );
    }
  };

  return (
    <Flex pt="30" width="100%" alignItems="center" justifyContent="center">
      <Box p={8} width="400px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Text fontSize="2xl">Register</Text>
        </Box>

        {isVerificationStep ? (
          <Box my={4} textAlign="center">
            <FormControl>
              <FormLabel>Verification Code</FormLabel>
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </FormControl>
            {apiError && (
              <Alert status="error" mt={4}>
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}
            <Button
              width="full"
              mt={4}
              onClick={handleVerification}
              colorScheme="teal"
            >
              Verify
            </Button>
            <Button
              mt={6}
              onClick={handleResendCode}
              colorScheme="teal"
              variant="link"
            >
              Resend Code
            </Button>
            <Button
              mx={6}
              as={Link}
              to="/"
              colorScheme="teal"
              variant="outline"
            >
              Login
            </Button>
          </Box>
        ) : (
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
              <FormControl mt={6} isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>
              {apiError && (
                <Alert status="error" mt={4}>
                  <AlertDescription>{apiError}</AlertDescription>
                </Alert>
              )}

              <Button width="full" mt={4} type="submit" colorScheme="teal">
                Register
              </Button>
              <Button
                width="full"
                my={4}
                as={Link}
                to="/"
                colorScheme="teal"
                variant="outline"
              >
                Login
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default RegisterPage;
