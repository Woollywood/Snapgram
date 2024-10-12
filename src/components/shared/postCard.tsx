import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { IPostModel } from '@/types';
import { useAuth } from '@/context/auth';
import { PostStats } from './postStats';

export const PostCard: React.FC<{ post: IPostModel }> = ({ post }) => {
	const { user } = useAuth()!;

	return (
		<div className='post-card'>
			<div className='flex-between'>
				<div className='flex items-center gap-3'>
					<Link to={`/profile/${post.creator.$id}`}>
						<img
							src={post.creator.imageUrl || '/assets/icons/profile-placeholder.svg'}
							alt='creator'
							className='w-12 rounded-full lg:h-12'
						/>
					</Link>
					<div className='flex flex-col'>
						<p className='base-medium lg:body-bold text-light-1'>{post.creator.name}</p>
						<div className='flex-center gap-2 text-light-3'>
							<p className='subtle-semibold lg:small-regular'>{moment(post.$createdAt).fromNow()}</p>-
							<p className='subtle-semibold lg:small-regular'>{post.location}</p>
						</div>
					</div>
				</div>
				{user?.$id === post.creator.$id && (
					<Link to={`/update-post/${post.$id}`}>
						<img src='/assets/icons/edit.svg' alt='edit' width={20} height={20} />
					</Link>
				)}
			</div>
			<Link to={`/posts/${post.$id}`}>
				<div className='small-medium lg:base-medium py-5'>
					<p>{post.caption}</p>
					<ul className='mt-2 flex flex-wrap gap-1'>
						{post.tags.map((tag) => (
							<li key={tag} className='text-light-3'>
								#{tag}
							</li>
						))}
					</ul>
				</div>
				<div className='relative'>
					<img
						src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
						className='post-card_img !object-contain'
						alt='post-image'
					/>
				</div>
			</Link>
			<PostStats post={post} userId={user?.$id!} />
		</div>
	);
};
