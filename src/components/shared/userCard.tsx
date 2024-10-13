import { IUser } from '@/types';
import React from 'react';
import { Button } from '@/components/ui/button';

export const UserCard: React.FC<IUser> = ({ username, name, imageUrl }) => {
	return (
		<div className='flex flex-col items-center justify-center rounded-lg border border-light-4 p-6'>
			<img src={imageUrl} alt={`${username}'s avatar`} className='mb-6 h-12 w-12 rounded-full' />
			<p className='mb-0.5 text-lg/3 text-light-2'>{name}</p>
			<p className='mb-4 text-gray-500'>@{username}</p>
			<Button className='shad-button_primary'>Follow</Button>
		</div>
	);
};
