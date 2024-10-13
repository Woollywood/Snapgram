import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Title } from '@/components/ui/title';
import { useGetRecentPosts } from '@/lib/reactQuery';
import { PostCard } from '@/components/shared/postCard';
import { Loader } from '@/components/shared/loader';

export const Component: React.FC = () => {
	const { data: posts, isPending, fetchNextPage, hasNextPage } = useGetRecentPosts();

	const { ref, inView } = useInView({
		threshold: 0,
	});

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	return (
		<div className='flex flex-1'>
			<div className='home-container'>
				<Title title='Home Feed' icon='/assets/icons/posts.svg' alt='add' />
				{isPending ? (
					<h2>Loading...</h2>
				) : (
					<>
						<ul className='flex w-full flex-1 flex-col gap-9'>
							{posts.pages.map((postPage) =>
								postPage.documents.map((post) => <PostCard key={post.$id} post={post} />),
							)}
						</ul>
						{hasNextPage && (
							<div ref={ref} className='mt-10 flex items-center justify-center'>
								<Loader />
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};
