import { ID, ImageGravity, Models, Query } from 'appwrite';
import { IUserCreate, IPostCreate, IUser, IPostModel, IPostUpdate, ISave } from '@/types';
import { account, appwriteConfig, avatars, databases, storage } from './config';

export const createUserAccount = async (user: IUserCreate) => {
	try {
		const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);

		if (!newAccount) {
			throw Error;
		}

		const avatarUrl = avatars.getInitials(user.name);

		const newUser = await saveUserToDB({
			accountId: newAccount.$id,
			name: newAccount.name,
			email: newAccount.email,
			username: user.username,
			imageUrl: avatarUrl,
		});

		return newUser;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const saveUserToDB = async (user: {
	accountId: string;
	email: string;
	name: string;
	imageUrl: string;
	username?: string;
}) => {
	try {
		const newUser = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			user,
		);

		return newUser;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const signInAccount = async (user: { email: string; password: string }) => {
	try {
		return await account.createEmailPasswordSession(user.email, user.password);
	} catch (error) {
		console.log(error);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) {
			throw Error;
		}

		const currentUser = await databases.listDocuments<IUser>(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)],
		);

		if (!currentUser) {
			throw Error;
		}

		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
	}
};

export const signOutAccount = async () => {
	try {
		const session = await account.deleteSession('current');

		return session;
	} catch (error) {
		console.log(error);
	}
};

export const createPost = async (post: IPostCreate) => {
	try {
		const uploadedFile = await uploadFile(post.file[0]);

		if (!uploadedFile) {
			throw Error;
		}

		const fileUrl = getFilePreview(uploadedFile.$id);

		if (!fileUrl) {
			deleteFile(uploadedFile.$id);
			throw Error;
		}

		const newPost = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			ID.unique(),
			{
				creator: post.creator,
				caption: post.caption,
				imageUrl: fileUrl,
				imageId: uploadedFile.$id,
				location: post.location,
				tags: post.tags,
			},
		);

		if (!newPost) {
			await deleteFile(uploadedFile.$id);
			throw Error;
		}

		return newPost as unknown as IPostCreate;
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = async (post: IPostUpdate) => {
	const hasFileToUpdate = post.file.length > 0;

	try {
		let image = {
			imageUrl: post.imageUrl,
			imageId: post.imageId,
		};

		if (hasFileToUpdate) {
			const uploadedFile = await uploadFile(post.file[0]);

			if (!uploadedFile) {
				throw Error;
			}

			const fileUrl = getFilePreview(uploadedFile.$id);

			if (!fileUrl) {
				deleteFile(uploadedFile.$id);
				throw Error;
			}

			image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
		}

		const updatedPost = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			post.$id,
			{
				caption: post.caption,
				imageUrl: image.imageUrl,
				imageId: image.imageId,
				location: post.location,
				tags: post.tags,
			},
		);

		if (!updatedPost) {
			await deleteFile(post.imageId);
			throw Error;
		}

		return updatedPost as unknown as IPostModel;
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = async (postId: string, imageId: string) => {
	if (!postId || !imageId) {
		throw Error;
	}

	try {
		await deleteFile(imageId);
		await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, postId);

		return { status: 'ok' };
	} catch (error) {
		console.log(error);
	}
};

export const uploadFile = async (file: File) => {
	try {
		const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), file);

		return uploadedFile;
	} catch (error) {
		console.log(error);
	}
};

export const deleteFile = async (fileId: string) => {
	try {
		await storage.deleteFile(appwriteConfig.storageId, fileId);

		return { status: 'ok' };
	} catch (error) {
		console.log(error);
	}
};

export const getFilePreview = (fileId: string) => {
	try {
		const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, ImageGravity.Top, 100);

		return fileUrl;
	} catch (error) {
		console.log(error);
	}
};

export const getRecentPosts = async ({ pageParam }: { pageParam: number }) => {
	const queries = [Query.orderDesc('$createdAt'), Query.limit(20)];

	if (pageParam) {
		queries.push(Query.cursorAfter(pageParam));
	}

	const posts = await databases.listDocuments<IPostModel>(
		appwriteConfig.databaseId,
		appwriteConfig.postCollectionId,
		queries,
	);

	if (!posts) {
		throw Error;
	}

	return posts;
};

export const likePost = async (postId: string, likesArray: string[]) => {
	try {
		const updatedPost = await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			postId,
			{
				likes: likesArray,
			},
		);

		if (!updatedPost) {
			throw Error;
		}

		return updatedPost as unknown as IPostModel;
	} catch (error) {
		console.log(error);
	}
};

export const savePost = async (postId: string, userId: string) => {
	try {
		const updatedPost = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.savesCollectionId,
			ID.unique(),
			{
				user: userId,
				post: postId,
			},
		);

		if (!updatedPost) {
			throw Error;
		}

		return updatedPost as unknown as ISave;
	} catch (error) {
		console.log(error);
	}
};

export const deleteSavedPost = async (savedRecordId: string, postId: string) => {
	try {
		const statusCode = await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.savesCollectionId,
			savedRecordId,
		);

		if (!statusCode) {
			throw Error;
		}

		return { status: 'ok', postId, deletedRecordId: savedRecordId };
	} catch (error) {
		console.log(error);
	}
};

export const getPostById = async (postId: string) => {
	try {
		const post = await databases.getDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, postId);

		return post as unknown as IPostModel;
	} catch (error) {
		console.log(error);
	}
};

export const getExplorePage = async ({ searchParam, pageParam }: { searchParam: string; pageParam: string }) => {
	const _queries = [Query.orderDesc('$updatedAt'), Query.limit(20)];
	const queries = searchParam.length > 0 ? [Query.search('caption', searchParam), ..._queries] : _queries;

	if (pageParam) {
		queries.push(Query.cursorAfter(pageParam));
	}

	try {
		const posts = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.postCollectionId,
			queries,
		);

		if (!posts) {
			throw Error;
		}

		return posts as Models.DocumentList<IPostModel>;
	} catch (error) {
		console.log(error);
	}
};
