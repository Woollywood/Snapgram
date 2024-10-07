import { getCurrentUser } from '@/lib/appwrite/api';
import { AuthStateContext, IUser } from '@/types';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext<AuthStateContext | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [isAuthenticated, setAuthenticated] = useState(false);

	const checkAuthUser = async () => {
		try {
			const currentAccount = await getCurrentUser();

			if (currentAccount) {
				setUser(currentAccount);

				setAuthenticated(true);

				return true;
			}

			return false;
		} catch (error) {
			console.log(error);
			return false;
		} finally {
			setLoading(false);
		}
	};

	const value = { user, setUser, isLoading, isAuthenticated, setAuthenticated, checkAuthUser };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
