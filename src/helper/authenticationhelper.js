import authService from '../services/authService';

const validateToken = async () => {
  try {
    const user = await authService.getUser();
    if (!user) {
      return false;
    }
    
    const isExpired = await authService.isTokenExpired();
    if (isExpired) {
      await authService.signOut();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

const getToken = async () => {
  try {
    return await authService.getAccessToken();
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

const clearToken = async () => {
  try {
    await authService.signOut();
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};

const signIn = async () => {
  try {
    await authService.signIn();
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

const handleSignInCallback = async () => {
  try {
    const user = await authService.signInCallback();
    return user;
  } catch (error) {
    console.error('Error handling sign in callback:', error);
    throw error;
  }
};

export { validateToken, getToken, clearToken, signIn, handleSignInCallback };

