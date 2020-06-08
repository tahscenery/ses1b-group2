import { createContext } from 'react';

export interface User {
  accessToken: string;
  userId: string;
  isAdmin: boolean;
}

export interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: (_) => {},
  logout: () => {},
});

export default AuthContext;
