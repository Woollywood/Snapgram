import { bottombarLinks } from '@/constants';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const BottomBar: React.FC = () => {
	return (
		<section className='bottom-bar !fixed !bottom-0 !left-0 !w-full'>
			{bottombarLinks.map((link) => (
				<NavLink
					key={link.route}
					to={link.route}
					className='flex-center [&.active_img]:invert-white group flex-col gap-1 rounded-lg p-2 transition [&.active]:bg-primary-500'>
					<img src={link.imgURL} alt={link.label} className='group-hover:invert-white' />
					<p className='text-sm'>{link.label}</p>
				</NavLink>
			))}
		</section>
	);
};
