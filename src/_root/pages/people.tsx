import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader } from '@/components/shared/loader';
import { UserCard } from '@/components/shared/UserCard';
import { usePeoplePage } from '@/lib/reactQuery';

export const Component: React.FC = () => {
	const { data: people, fetchNextPage, hasNextPage, isPending } = usePeoplePage();

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
		<div className='explore-container'>
			{isPending ? (
				<div className='flex h-full w-full items-center justify-center'>
					<Loader />
				</div>
			) : (
				<>
					<div className='grid w-full grid-cols-3 gap-4'>
						{people.pages.map((peoplePage) =>
							peoplePage.documents.map((user) => <UserCard key={user.$id} {...user} />),
						)}
					</div>
					{hasNextPage && (
						<div ref={ref} className='mt-10 flex items-center justify-center'>
							<Loader />
						</div>
					)}
				</>
			)}
		</div>
	);
};
