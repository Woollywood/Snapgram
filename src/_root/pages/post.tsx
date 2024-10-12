import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDeletePost, useGetPostById } from '@/lib/reactQuery';
import { Loader } from '@/components/shared/loader';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { PostStats } from '@/components/shared/postStats';

export const Component: React.FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { data: post, isPending: isLoadingPost } = useGetPostById(id || '');

	const { user } = useAuth()!;
	const isUserCreator = user?.$id === post?.creator.$id;

	const { mutateAsync: deletePost, isPending: isDeletingPost } = useDeletePost();

	const handleDeletePost = async () => {
		await deletePost({ postId: post?.$id!, imageId: post?.imageId! });
		navigate('/');
	};

	return (
		<div className='post_details-container'>
			{isLoadingPost ? (
				<Loader />
			) : (
				<div className='post_details-card'>
					<img src={post?.imageUrl} alt='creator' className='post_details-img' />
					<div className='post_details-info'>
						<div className='flex-between w-full'>
							<Link to={`/profile/${post?.creator.$id}`} className='flex items-center gap-3'>
								<img
									src={post?.creator.imageUrl || '/assets/icons/profile-placeholder.svg'}
									alt='creator'
									className='h-8 w-8 flex-shrink-0 rounded-full lg:h-12 lg:w-12'
								/>
								<div className='flex flex-col'>
									<p className='base-medium lg:body-bold text-light-1'>{post?.creator.name}</p>
									<div className='flex-center gap-2 text-light-3'>
										<p className='subtle-semibold lg:small-regular'>
											{moment(post?.$createdAt).fromNow()}
										</p>
										-<p className='subtle-semibold lg:small-regular'>{post?.location}</p>
									</div>
								</div>
							</Link>
							{isUserCreator && (
								<div className='flex-center gap-2'>
									<Link to={`/update-post/${post?.$id}`}>
										<img src='/assets/icons/edit.svg' alt='edit' width={24} height={24} />
									</Link>
									{isDeletingPost ? (
										<Loader size='sm' />
									) : (
										<Button
											onClick={handleDeletePost}
											variant='ghost'
											className='ghost_details-delete_btn'>
											<img src='/assets/icons/delete.svg' alt='delete' width={24} height={24} />
										</Button>
									)}
								</div>
							)}
						</div>
						<hr className='w-full border border-dark-4/80' />
						<div className='small-medium lg:base-regular flex w-full flex-1 flex-col'>
							<p>{post?.caption}</p>
							<ul className='mt-2 flex flex-wrap gap-1'>
								{post?.tags.map((tag) => (
									<li key={tag} className='text-light-3'>
										#{tag}
									</li>
								))}
							</ul>
						</div>
						<div className='w-full'>
							<PostStats post={post!} userId={user?.$id!} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
