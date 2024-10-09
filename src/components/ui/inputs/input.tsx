import * as React from 'react';
import { InputWrapper } from './inputWrapper';
import { BaseInput } from './baseInput';

export type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, Props>(({ className, type, ...props }, ref) => {
	return (
		<InputWrapper className={className}>
			<BaseInput type={type} ref={ref} {...props} />
		</InputWrapper>
	);
});
Input.displayName = 'Input';
