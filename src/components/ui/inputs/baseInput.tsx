import React, { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const BaseInput = forwardRef<HTMLInputElement, Props>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				className,
				'h-12 w-full bg-transparent px-3 py-1 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed',
			)}
			ref={ref}
			{...props}
		/>
	);
});
BaseInput.displayName = 'BaseInput';
