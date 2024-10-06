import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './assets/common.css';
import { router } from './router';
import { Toaster } from '@/components/ui/toaster';

export const App: React.FC = () => {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster />
		</>
	);
};
