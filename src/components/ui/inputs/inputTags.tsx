import React, { useState, useEffect, forwardRef } from 'react';
import { InputWrapper } from './inputWrapper';
import { BaseInput } from './baseInput';
import { Badge } from '../badge';
import { CloseIcon } from '../icons';
import { useToast } from '@/hooks/use-toast';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	initialTags?: string[];
	onUpdate?: (tags: string[]) => void;
};

export const InputTags = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, initialTags, onUpdate, ...props }, ref) => {
		const { toast } = useToast();

		const [value, setValue] = useState('');
		const [tags, setTags] = useState<string[]>(initialTags ?? []);
		const hasTags = tags.length > 0;

		useEffect(() => {
			if (hasTags && onUpdate) {
				onUpdate(tags);
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [tags]);

		const addTag = () => {
			if (!tags.includes(value)) {
				setTags([...tags, value]);
				setValue('');
			} else {
				toast({
					title: `${value} tag is already exists`,
				});
			}
		};

		const removeTag = (value: string) => {
			setTags(tags.filter((tag) => tag !== value));
		};

		const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
			setValue(event.target.value);
		};

		const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.code === 'Enter') {
				event.preventDefault();
				addTag();
			}
		};

		return (
			<InputWrapper className={className}>
				{hasTags && (
					<div className='flex flex-wrap items-center gap-1 px-3 py-1'>
						{tags.map((tag) => (
							<Badge
								key={tag}
								className='flex cursor-pointer items-center gap-1 [&_button]:hover:scale-125'
								onClick={() => removeTag(tag)}>
								<span>{tag}</span>
								<button type='button' className='p-0.5 transition-transform'>
									<CloseIcon size={12} className='fill-white' />
								</button>
							</Badge>
						))}
					</div>
				)}
				<BaseInput
					type={type}
					ref={ref}
					{...props}
					value={value}
					onChange={onChangeHandler}
					onKeyDown={onKeyDownHandler}
				/>
			</InputWrapper>
		);
	},
);
InputTags.displayName = 'InputTags';
