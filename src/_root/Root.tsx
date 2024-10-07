import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth, useAuthSetter } from '@/context/auth';
import { RootLoader } from '@/components/shared/rootLoader';

export const Root: React.FC = () => {
	const { isLoading } = useAuth()!;
	const { checkAuthUser } = useAuthSetter()!;

	useEffect(() => {
		checkAuthUser();
	}, [checkAuthUser]);

	return <>{isLoading ? <RootLoader /> : <Outlet />}</>;
};
