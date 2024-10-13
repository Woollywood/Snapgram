import { IPostModel } from '@/types';
import { Link } from 'react-router-dom';
import { Models } from 'appwrite';
import React from 'react';
import { useAuth } from '@/context/auth';
import { PostStats } from './postStats';

interface Props {
	posts: Models.DocumentList<IPostModel>;
	showUser?: boolean;
	showStats?: boolean;
}

export const GridPostList: React.FC<Props> = ({ posts, showUser = true, showStats = true }) => {
	const { user } = useAuth()!;

	return (
		<div className='grid-container'>
			{posts.documents.map((post) => (
				<div key={post.$id} className='relative h-80 min-w-80'>
					<Link to={`/posts/${post.$id}`} className='grid-post_link'>
						<img src={post.imageUrl} alt='post' className='h-full w-full object-cover' />
					</Link>
					<div className='grid-post_user'>
						{showUser && (
							<div className='flex flex-1 items-center justify-start gap-2'>
								<img src={post.creator.imageUrl} alt='creator' className='h-8 w-8 rounded-full' />
								<p className='line-clamp-1'>{post.creator.name}</p>
							</div>
						)}
						{showStats && <PostStats post={post} userId={user?.$id!} />}
					</div>
				</div>
			))}
		</div>
	);
};
