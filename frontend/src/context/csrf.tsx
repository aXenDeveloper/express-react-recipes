import { createContext, useContext } from 'react';
import { AuthContextType } from '../types/contextTypes';

export const AuthContext = createContext<AuthContextType | null>(null);

export const useCSRF = () => useContext(AuthContext);
