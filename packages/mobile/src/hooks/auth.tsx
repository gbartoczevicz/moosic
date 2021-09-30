import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { accountsClient } from '@/services/http-client';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  token: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface Context {
  user: User;
  isLoading: boolean;
  signIn(c: Credentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<Context>({} as Context);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStorage(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet(['@moosic/token', '@moosic/user']);

      if (token[1] && user[1]) {
        accountsClient.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setIsLoading(false);
    }

    loadStorage();
  }, []);

  const signIn = useCallback(async ({ email, password }: Credentials) => {
    const res = await accountsClient.post('/sessions', {
      email,
      password
    });

    const { token, ...user } = res.data;

    await AsyncStorage.multiSet([
      ['@moosic/token', token],
      ['@moosic/user', JSON.stringify(user)]
    ]);

    accountsClient.defaults.headers.authorization = `Bearer ${token[1]}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    await AsyncStorage.multiRemove(['@moosic/token', '@moosic/user']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      setData({
        token: data.token,
        user
      });

      await AsyncStorage.setItem('@moosic/user', JSON.stringify(user));
    },
    [data]
  );

  return (
    <AuthContext.Provider value={{ user: data.user, isLoading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): Context {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
