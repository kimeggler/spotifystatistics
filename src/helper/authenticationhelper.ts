import authService from '../services/authService';

/**
 * Validates if the current user is authenticated
 */
export const validateToken = async (): Promise<boolean> => {
  try {
    return await authService.isAuthenticated();
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

/**
 * Gets the current access token
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await authService.getAccessToken();
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

/**
 * Clears the current user session
 */
export const clearToken = async (): Promise<void> => {
  try {
    await authService.removeUser();
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};

/**
 * Initiates the sign-in process
 */
export const signIn = async (): Promise<void> => {
  try {
    await authService.signIn();
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/**
 * Handles the callback after sign-in
 */
export const handleSignInCallback = async (): Promise<void> => {
  try {
    await authService.signInCallback();
  } catch (error) {
    console.error('Error handling sign in callback:', error);
    throw error;
  }
};

/**
 * Signs out the current user
 */
export const signOut = async (): Promise<void> => {
  try {
    await authService.signOut();
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

/**
 * Gets the current user
 */
export const getUser = async () => {
  try {
    return await authService.getUser();
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};