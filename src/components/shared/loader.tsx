import React from 'react';
import clsx from 'clsx';

export const Loader: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
	return (
		<div className={clsx('lds-ring', size)}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};
