import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  checkAuth: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const token = await authService.getAccessToken();
        setAccessToken(token);
      } else {
        setAccessToken(null);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
      setAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(async () => {
    try {
      await authService.signIn();
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authService.removeUser();
      setIsAuthenticated(false);
      setAccessToken(null);
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        accessToken,
        checkAuth,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
