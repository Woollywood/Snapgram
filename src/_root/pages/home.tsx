import React from 'react';
import { Title } from '@/components/ui/title';
import { useGetRecentPosts } from '@/lib/reactQuery';
import { PostCard } from '@/components/shared/postCard';

export const Component: React.FC = () => {
	const { data: posts, isPending } = useGetRecentPosts();

	return (
		<div className='flex flex-1'>
			<div className='home-container'>
				<Title title='Home Feed' icon='/assets/icons/posts.svg' alt='add' />
				{isPending ? (
					<h2>Loading...</h2>
				) : (
					<ul className='flex w-full flex-1 flex-col gap-9'>
						{posts?.documents.map((post) => <PostCard key={post.$id} post={post} />)}
					</ul>
				)}
			</div>
		</div>
	);
};
