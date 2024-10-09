import { useCallback, useMemo } from 'react';
import { getCurrentUser } from '@/lib/appwrite/api';
import { IUser } from '@/types';
import React, { createContext, useState } from 'react';

export type AuthStateContext = {
	user: IUser | null;
	isLoading: boolean;
	isAuthenticated: boolean;
};

export type AuthStateSetterContext = {
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
	setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	checkAuthUser: () => Promise<boolean>;
};

export const AuthContext = createContext<AuthStateContext | null>(null);
export const AuthSetterContext = createContext<AuthStateSetterContext | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [isAuthenticated, setAuthenticated] = useState(false);

	const _checkAuthUser = async () => {
		setLoading(true);
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

	const value = { user, isLoading, isAuthenticated };
	const checkAuthUser = useCallback(_checkAuthUser, []);
	const actions = useMemo(() => ({ setAuthenticated, checkAuthUser, setUser }), [checkAuthUser]);

	return (
		<AuthContext.Provider value={value}>
			<AuthSetterContext.Provider value={actions}>{children}</AuthSetterContext.Provider>
		</AuthContext.Provider>
	);
};
