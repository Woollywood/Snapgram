import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from '@/components/shared/topBar';
import { Sidebar } from '@/components/shared/sidebar';
import { BottomBar } from '@/components/shared/bottomBar';

export const Component: React.FC = () => {
	return (
		<div className='mx-auto min-h-screen w-full md:grid md:grid-cols-[auto_1fr] lg:max-w-5xl'>
			<TopBar />
			<Sidebar />
			<section className='flex h-full flex-1'>
				<Outlet />
			</section>
			<BottomBar />
		</div>
	);
};
