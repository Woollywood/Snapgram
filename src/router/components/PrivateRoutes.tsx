import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

export const PrivateRoutes: React.FC = () => {
	const { user } = useAuth()!;

	if (!user) {
		return <Navigate to='/sign-in' />;
	}

	return <Outlet />;
};
