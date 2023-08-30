import axios from 'axios';

// const BASE_URL = 'https://cognito-idp.us-east-2.amazonaws.com/';
const BASE_URL =
  'https://6cl8w2orii.execute-api.us-east-2.amazonaws.com/test1/';
const CLIENT_ID = '6pidkt6mt2om9qrc7e3lufi79r';
const HEADERS = {
  'Content-Type': 'application/x-amz-json-1.1',
};

export const registerUser = async (email, password) => {
  return axios.post(
    `${BASE_URL}register`,
    {
      ClientId: CLIENT_ID,
      Password: password,
      Username: email,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    },
    {
      headers: {
        ...HEADERS,
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp',
      },
    },
  );
};

export const verifyUser = async (email, verificationCode) => {
  return axios.post(
    `${BASE_URL}verify`,
    {
      ClientId: CLIENT_ID,
      ConfirmationCode: verificationCode,
      Username: email,
    },
    {
      headers: {
        ...HEADERS,
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmSignUp',
      },
    },
  );
};

export const resendVerificationCode = async (email) => {
  return axios.post(
    `${BASE_URL}resend-confirmation`,
    {
      ClientId: CLIENT_ID,
      Username: email,
    },
    {
      headers: {
        ...HEADERS,
        'X-Amz-Target':
          'AWSCognitoIdentityProviderService.ResendConfirmationCode',
      },
    },
  );
};

export const loginUser = async (email, password) => {
  return axios.post(
    `${BASE_URL}login`,
    {
      ClientId: CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    },
    {
      headers: {
        ...HEADERS,
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      },
    },
  );
};
