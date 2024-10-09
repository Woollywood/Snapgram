import React from 'react';

import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

export const InputWrapper: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
	return (
		<div
			className={cn(
				className,
				'grid w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors',
			)}>
			{children}
		</div>
	);
};
InputWrapper.displayName = 'InputWrapper';
