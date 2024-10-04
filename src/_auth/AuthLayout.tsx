import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
	return (
		<div className='flex'>
			<section className='flex flex-1 flex-col items-center justify-center py-10'>
				<Outlet />
			</section>
			<img
				src='/assets/images/side-img.svg'
				alt='logo'
				className='hidden h-screen w-1/2 bg-no-repeat object-cover xl:block'
			/>
		</div>
	);
};

export default AuthLayout;
