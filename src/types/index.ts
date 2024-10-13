import { Models } from 'appwrite';

export type INavLink = {
	imgURL: string;
	route: string;
	label: string;
};

export interface IPostModel extends Models.Document {
	creator: IUser;
	likes: IUser[];
	caption: string;
	tags: string[];
	imageUrl: string;
	imageId: string;
	location: string;
	save: ISave[];
}

export interface IPostCreate {
	creator: IUser['$id'];
	caption: string;
	location: string;
	tags: string[];
	file: File[];
}

export interface IPostUpdate extends Pick<Models.Document, '$id'> {
	caption: string;
	imageId: string;
	imageUrl: string;
	file: File[];
	location?: string;
	tags?: string[];
	likes?: string[];
}

export interface IUser extends Models.Document {
	accountId: string;
	bio: string;
	email: string;
	imageId: string;
	imageUrl: string;
	liked: IPostModel[];
	name: string;
	posts: IPostModel[];
	save: ISave[];
	username: string;
	followers: IFollower[];
}

export interface IFollower extends Models.Document {
	user: IUser;
}

export type IUserCreate = {
	name: string;
	email: string;
	username: string;
	password: string;
};

export interface ISave extends Models.Document {
	user: IUser;
	post: IPostModel;
}
