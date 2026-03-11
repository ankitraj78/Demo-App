import React, {createContext, useContext, useState, useCallback} from 'react';
import {login as loginApi} from '../services/authService';
import {setAuthToken} from '../services/apiClient';

type AuthState = {
  isAuthenticated: boolean;
  clientId: number | null;
  username: string | null;
  loading: boolean;
  error: string | null;
};

type AuthContextType = AuthState & {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    clientId: null,
    username: null,
    loading: false,
    error: null,
  });

  const login = useCallback(async (username: string, password: string) => {
    setState(prev => ({...prev, loading: true, error: null}));
    try {
      const response = await loginApi(username, password);

      if (!response.base64EncodedAuthenticationKey) {
        throw new Error('Invalid credentials');
      }

      console.log('=== LOGIN SUCCESS ===');
      console.log('Auth Token:', response.base64EncodedAuthenticationKey);
      console.log('Client IDs:', response.clients);
      console.log('User ID:', response.userId);
      console.log('Username:', response.username);
      console.log('====================');

      setAuthToken(response.base64EncodedAuthenticationKey);

      const clientId =
        response.clients.length > 0 ? response.clients[0] : response.userId;

      setState({
        isAuthenticated: true,
        clientId,
        username: response.username ?? username,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error:
          err instanceof Error ? err.message : 'Login failed. Please try again.',
      }));
    }
  }, []);

  const logout = useCallback(() => {
    setAuthToken('');
    setState({
      isAuthenticated: false,
      clientId: null,
      username: null,
      loading: false,
      error: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{...state, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
