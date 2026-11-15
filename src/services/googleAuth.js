import * as SecureStore from 'expo-secure-store';

const API_URL =
  'https://ei4529642e.execute-api.ap-south-1.amazonaws.com/prod/api/auth/google';

export const loginWithGoogleApi = async (googleIdToken) => {
  if (!googleIdToken) {
    throw new Error('Google ID token is missing.');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      credential: googleIdToken,
    }),
  });

  const result = await response.json();

  if (!response.ok || result.success !== true) {
    throw new Error(result.message || 'Google login failed.');
  }

  if (!result.data?.token) {
    throw new Error('Session token not received from server.');
  }

  await SecureStore.setItemAsync(
    'bionet_session_token',
    result.data.token
  );

  await SecureStore.setItemAsync(
    'bionet_user',
    JSON.stringify(result.data.user)
  );

  return result.data;
};