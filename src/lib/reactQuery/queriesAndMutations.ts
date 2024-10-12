import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createPost,
	createUserAccount,
	deletePost,
	deleteSavedPost,
	getCurrentUser,
	getPostById,
	getRecentPosts,
	likePost,
	savePost,
	signInAccount,
	signOutAccount,
	updatePost,
} from '../appwrite/api';
import { IPostCreate, IPostUpdate, IUserCreate } from '@/types';
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

export const useUpdatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (post: IPostUpdate) => updatePost(post),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_POST_BY_ID, data?.$id],
			});
		},
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) => deletePost(postId, imageId),
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

export const useLikePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ postId, likesArray }: { postId: string; likesArray: string[] }) => likePost(postId, likesArray),
		onSuccess: async (data) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_POST_BY_ID, data?.$id],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_CURRENT_USER],
			});
		},
	});
};

export const useSavePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ postId, userId }: { postId: string; userId: string }) => savePost(postId, userId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_CURRENT_USER],
			});
		},
	});
};

export const useDeleteSavedPost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.GET_CURRENT_USER],
			});
		},
	});
};

export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: [QueryKeys.GET_CURRENT_USER],
		queryFn: getCurrentUser,
	});
};

export const useGetPostById = (postId: string) => {
	return useQuery({
		queryKey: [QueryKeys.GET_POST_BY_ID, postId],
		queryFn: () => getPostById(postId),
		enabled: !!postId,
	});
};
