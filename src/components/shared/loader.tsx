import React from 'react';

export const Loader: React.FC = () => {
	return (
		<div className='flex-center w-full'>
			<img src='/assets/icons/loader.svg' alt='loader' width={24} height={24} />
		</div>
	);
};
