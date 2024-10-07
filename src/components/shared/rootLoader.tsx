import React from 'react';
import { Loader } from './loader';

export const RootLoader: React.FC = () => {
	return (
		<div className='flex h-screen flex-col items-center justify-center gap-6 overflow-hidden'>
			<img src='/assets/images/logo.svg' alt='logo' />
			<Loader size='lg' />
		</div>
	);
};
