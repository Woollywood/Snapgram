import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

export const SignRoutes: React.FC = () => {
	const { user } = useAuth()!;

	if (user) {
		return <Navigate to='/' />;
	}

	return <Outlet />;
};
