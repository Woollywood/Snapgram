import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createPost,
	createUserAccount,
	deletePost,
	deleteSavedPost,
	getCurrentUser,
	getExplorePage,
	getPostById,
	getRecentPosts,
	likePost,
	savePost,
	signInAccount,
	signOutAccount,
	updatePost,
} from '../appwrite/api';
import { IPostCreate, IPostModel, IPostUpdate, IUserCreate } from '@/types';
import { QueryKeys } from './queryKeys';
import { Models } from 'appwrite';

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
				queryKey: [QueryKeys.Posts],
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
				queryKey: [QueryKeys.Posts, data?.$id],
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
				queryKey: [QueryKeys.Posts],
			});
		},
	});
};

export const useGetRecentPosts = () => {
	return useInfiniteQuery({
		queryKey: [QueryKeys.Posts],
		// @ts-ignore
		queryFn: getRecentPosts,
		getNextPageParam: (lastPage: Models.DocumentList<IPostModel>) => {
			if (lastPage && lastPage.documents.length === 0) {
				return null;
			}
			const lastId = lastPage.documents[lastPage.documents.length - 1].$id;

			return lastId;
		},
	});
};

export const useLikePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ postId, likesArray }: { postId: string; likesArray: string[] }) => likePost(postId, likesArray),
		onSuccess: async (data) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Posts],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Posts, data?.$id],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.User],
			});
		},
	});
};

export const useSavePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ postId, userId }: { postId: string; userId: string }) => savePost(postId, userId),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Posts],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Posts, data?.$id],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.User],
			});
		},
	});
};

export const useDeleteSavedPost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ savedRecordId, postId }: { savedRecordId: string; postId: string }) =>
			deleteSavedPost(savedRecordId, postId),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Posts],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Posts, data?.postId],
			});
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.User],
			});
		},
	});
};

export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: [QueryKeys.User],
		queryFn: getCurrentUser,
	});
};

export const useGetPostById = (postId: string) => {
	return useQuery({
		queryKey: [QueryKeys.Posts, postId],
		queryFn: () => getPostById(postId),
		enabled: !!postId,
	});
};

export const useExplorePage = ({ searchParam }: { searchParam: string }) => {
	return useInfiniteQuery({
		queryKey: [QueryKeys.Posts, searchParam],
		// @ts-ignore
		queryFn: ({ pageParam }) => getExplorePage({ pageParam, searchParam }),
		getNextPageParam: (lastPage: Models.DocumentList<IPostModel>) => {
			if (lastPage && lastPage.documents.length === 0) {
				return null;
			}

			const lastId = lastPage.documents[lastPage.documents.length - 1].$id;

			return lastId;
		},
	});
};
