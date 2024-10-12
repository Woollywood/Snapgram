import React from 'react';
import { useLikePost, useSavePost, useDeleteSavedPost } from '@/lib/reactQuery';
import { IPostModel } from '@/types';
import { useAuth } from '@/context/auth';
import { Loader } from './loader';

export const PostStats: React.FC<{ post: IPostModel; userId: string }> = ({ post }) => {
	const { user } = useAuth()!;

	const { mutateAsync: likePost, isPending: isLikePending } = useLikePost();
	const { mutateAsync: savePost, isPending: isSavePending } = useSavePost();
	const { mutateAsync: deleteSavedPost, isPending: isDeletePending } = useDeleteSavedPost();

	const likes = post.likes.map((user) => user.$id);
	const isUserLiked = likes.includes(user?.$id!);

	const savedPostRecord = post.save.find((save) => save.user.$id === post.creator.$id);
	const isSaved = !!savedPostRecord;

	const handleLike = () => {
		let newLikes = [];
		if (isUserLiked) {
			newLikes = [...likes.filter((likeUser) => likeUser !== user?.$id!)];
		} else {
			newLikes = [...likes, user?.$id!];
		}

		likePost({
			postId: post.$id,
			likesArray: newLikes,
		});
	};

	const handleSave = () => {
		if (savedPostRecord) {
			deleteSavedPost({ savedRecordId: savedPostRecord.$id, postId: post.$id });
		} else {
			savePost({ postId: post.$id, userId: user?.$id! });
		}
	};

	return (
		<div className='z-20 flex items-center justify-between'>
			<div className='mr-5'>
				{isLikePending ? (
					<Loader size='sm' />
				) : (
					<button className='flex items-center gap-2' onClick={handleLike}>
						<img
							src={isUserLiked ? '/assets/icons/liked.svg' : '/assets/icons/like.svg'}
							alt='like'
							width={20}
							height={20}
						/>
						<p className='small-medium lg:base-medium'>{likes.length}</p>
					</button>
				)}
			</div>
			<div className='flex gap-2'>
				{isSavePending || isDeletePending ? (
					<Loader size='sm' />
				) : (
					<button onClick={handleSave}>
						<img
							src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
							alt='like'
							width={20}
							height={20}
						/>
					</button>
				)}
			</div>
		</div>
	);
};
