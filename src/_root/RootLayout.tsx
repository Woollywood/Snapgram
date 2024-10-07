import React from 'react';
import { Outlet } from 'react-router-dom';

export const Component: React.FC = () => {
	return (
		<div>
			<h1>Root Layout</h1>
			<Outlet />
		</div>
	);
};
