import React from 'react';
import { Outlet } from 'react-router-dom';

export const Component: React.FC = () => {
	return (
		<div className='grid min-h-screen'>
			<Outlet />
		</div>
	);
};
