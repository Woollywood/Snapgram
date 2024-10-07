import { useContext } from 'react';
import { AuthContext, AuthSetterContext } from './context';

export const useAuth = () => {
	return useContext(AuthContext);
};

export const useAuthSetter = () => {
	return useContext(AuthSetterContext);
};
