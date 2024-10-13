import React, { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useInView } from 'react-intersection-observer';
import { Input } from '@/components/ui/inputs';
import { Title } from '@/components/ui/title';
import { useExplorePage } from '@/lib/reactQuery';
import { Loader } from '@/components/shared/loader';
import { GridPostList } from '@/components/shared/gridPostList';

export const Component: React.FC = () => {
	const [searchValue, setSearchValue] = useState('');
	const debouncedSearchValue = useDebounce(searchValue, 300);
	const { data: posts, fetchNextPage, hasNextPage } = useExplorePage({ searchParam: debouncedSearchValue });
	const isPosts = !posts;
	const hasPosts = posts?.pages.length > 0;

	const { ref, inView } = useInView({
		threshold: 0,
	});

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView, searchValue]);

	return (
		<div className='explore-container'>
			<Title title='Search Posts' icon='/assets/icons/search.svg' alt='search' />
			<div className='mt-6 flex w-full gap-1 rounded-lg bg-dark-4 px-4'>
				<img src='/assets/icons/search.svg' width={24} height={24} alt='search' />
				<Input
					type='text'
					placeholder='Search'
					className='explore-search'
					value={searchValue}
					onChange={(event) => setSearchValue(event.target.value)}
				/>
			</div>
			<div className='flex-between mb-7 mt-16 w-full max-w-5xl'>
				<Title title='Popular Today' icon='/assets/icons/posts.svg' alt='posts' />
				<div className='flex-center cursor-pointer gap-3 rounded-xl bg-dark-3 px-4 py-2'>
					<p className='small-medium md:base-medium text-light-2'>All</p>
					<img src='/assets/icons/filter.svg' alt='filter' width={20} height={20} />
				</div>
			</div>
			<div className='flex w-full max-w-5xl flex-wrap gap-9'>
				{isPosts ? (
					<div className='flex h-full w-full items-center justify-center'>
						<Loader />
					</div>
				) : hasPosts ? (
					<>
						<div className='grid-container'>
							{posts.pages.map((postsDocs, index) => (
								<GridPostList posts={postsDocs} key={index} />
							))}
						</div>
						{hasNextPage && (
							<div ref={ref} className='mt-10 flex items-center justify-center'>
								<Loader />
							</div>
						)}
					</>
				) : (
					<p className='mt-10 w-full text-center text-light-4'>No result</p>
				)}
			</div>
		</div>
	);
};
