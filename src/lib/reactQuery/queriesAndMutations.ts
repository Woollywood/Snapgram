import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPost, createUserAccount, getRecentPosts, signInAccount, signOutAccount } from '../appwrite/api';
import { IPostCreate, IUserCreate } from '@/types';
import { QueryKeys } from './queryKeys';

export const useCreateUserAccount = () => {
	return useMutation({
		mutationFn: (user: IUserCreate) => createUserAccount(user),
	});
};

export const useSigninAccount = () => {
	return useMutation({
		mutationFn: (user: { email: string; password: string }) => signInAccount(user),
	});
};

export const useSignoutAccount = () => {
	return useMutation({
		mutationFn: signOutAccount,
	});
};

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (post: IPostCreate) => createPost(post),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_RECENT_POSTS],
			});
		},
	});
};

export const useGetRecentPosts = () => {
	return useQuery({
		queryKey: [QueryKeys.GET_RECENT_POSTS],
		queryFn: getRecentPosts,
	});
};
