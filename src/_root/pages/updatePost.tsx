import React from 'react';
import { useParams } from 'react-router-dom';
import { Title } from '@/components/ui/title';
import { PostForm } from '@/components/forms/postForm';
import { useGetPostById } from '@/lib/reactQuery';
import { Loader } from '@/components/shared/loader';

export const Component: React.FC = () => {
	const { id } = useParams();
	const { data: post, isPending } = useGetPostById(id!);

	return (
		<div className='flex flex-1'>
			<div className='common-container'>
				{isPending ? (
					<div className='flex h-full w-full items-center justify-center'>
						<Loader />
					</div>
				) : (
					<>
						<Title title='Update post' icon='/assets/icons/add-post.svg' alt='add' />
						<PostForm post={post} action='update' />
					</>
				)}
			</div>
		</div>
	);
};
