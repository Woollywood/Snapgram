import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {
	return (
		<div>
			<h1>Root Layout</h1>
			<Outlet />
		</div>
	);
};

export default RootLayout;
