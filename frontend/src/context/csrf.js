import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export function useCSRF() {
	return useContext(AuthContext);
}
