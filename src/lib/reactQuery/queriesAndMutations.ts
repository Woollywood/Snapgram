import { useMutation } from '@tanstack/react-query';
import { createUserAccount, signInAccount, signOutAccount } from '../appwrite/api';
import { INewUser } from '@/types';

export const useCreateUserAccount = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUserAccount(user),
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
