import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

export const PublicRoutes: React.FC = () => {
	const { user } = useAuth()!;
	console.log(user);

	if (user) {
		return <Navigate to='/' />;
	}

	return <Outlet />;
};
