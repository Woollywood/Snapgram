import React from 'react';
import { Models } from 'appwrite';

export type INavLink = {
	imgURL: string;
	route: string;
	label: string;
};

export type IUpdateUser = {
	userId: string;
	name: string;
	bio: string;
	imageId: string;
	imageUrl: URL | string;
	file: File[];
};

export interface IUser extends Models.Document {
	id: string;
	name: string;
	username: string;
	email: string;
	imageUrl: string;
	bio: string;
}

export type AuthStateContext = {
	user: IUser | null;
	isLoading: boolean;
	isAuthenticated: boolean;
};

export type AuthStateSetterContext = {
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
	setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	checkAuthUser: () => Promise<boolean>;
};

export type INewUser = {
	name: string;
	email: string;
	username: string;
	password: string;
};

export interface INewPost extends Models.Document {
	userId: string;
	caption: string;
	file: File[];
	location?: string;
	tags?: string;
}

export interface IUpdatePost extends Models.Document {
	postId: string;
	caption: string;
	imageId: string;
	imageUrl: URL;
	file: File[];
	location?: string;
	tags?: string;
}
