import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from '@/components/shared/topBar';
import { Sidebar } from '@/components/shared/sidebar';
import { BottomBar } from '@/components/shared/bottomBar';

export const Component: React.FC = () => {
	return (
		<div className='min-h-screen w-full md:flex'>
			<TopBar />
			<Sidebar />
			<section className='flex h-full flex-1'>
				<Outlet />
			</section>
			<BottomBar />
		</div>
	);
};
