import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
	console.log('auth layout');

	return (
		<div>
			<h1>AuthLayout</h1>
			<Outlet />
		</div>
	);
};

export default AuthLayout;
