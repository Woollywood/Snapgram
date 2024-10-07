import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/context/auth';

export const Root: React.FC = () => {
	const { isLoading, checkAuthUser } = useAuth()!;

	useEffect(() => {
		checkAuthUser();
	}, []);

	return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
};
