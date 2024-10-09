import React from 'react';
import { Title } from '@/components/ui/title';
import { PostForm } from '@/components/forms/postForm';

export const Component: React.FC = () => {
	return (
		<div className='flex flex-1'>
			<div className='common-container'>
				<Title title='Create post' icon='/assets/icons/add-post.svg' alt='add' />
				<PostForm />
			</div>
		</div>
	);
};
