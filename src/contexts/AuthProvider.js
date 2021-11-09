import { createContext, useMemo, useState, useCallback, useEffect, useContext } from 'react';
import * as usersApi from '../api/users';
import * as api from '../api';

const JWT_TOKEN_KEY = 'auth_token';
const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

export const useSession = () => {
  const { token, user, ready, error } = useAuth();
  return { token, user, ready, error };
};

export const useLogin = () => {
  const { login } = useAuth();
  return login;
};

export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
};

export const AuthProvider = ({
  children,
}) => {
  // will be true until the token is set
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState(null);

  // set the token in LocalStorage and axios when there is one
  useEffect(() => {
    if (token) {
      api.setAuthToken(token);
      localStorage.setItem(JWT_TOKEN_KEY, token);
      setReady(true);
    }
  }, [token]);

  const login = useCallback(async (email, password) => {
    try {
      const { token, user } = await usersApi.login(email, password);
      setToken(token);
      setUser(user);
      setReady(true);
    } catch (error) {
      setError(error);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setReady(false);
  }, []);

  const value = useMemo(() => ({
    token,
    user,
    ready,
    error,
    login,
    logout,
  }), [token, user, ready, error, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
