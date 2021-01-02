import { createContext, useContext } from 'react';

interface test123 {
	tokenCSRF: string | undefined;
	createTokenCSRF: (key: string) => void;
	deleteTokenCSRF: () => void;
	memberData: {};
}

export const AuthContext = createContext<test123 | null>(null);

export function useCSRF(): test123 | null {
	return useContext(AuthContext);
}
