import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/inputs';
import { SignupValidation } from '@/lib/validation';
import { Loader } from '@/components/shared/loader';

import { useToast } from '@/hooks/use-toast';
import { useCreateUserAccount, useSigninAccount } from '@/lib/reactQuery';
import { useAuthSetter } from '@/context/auth';

export const Component: React.FC = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	const { checkAuthUser } = useAuthSetter()!;
	const { mutateAsync: createUserAccount, isPending } = useCreateUserAccount();
	const { mutateAsync: signInAccount } = useSigninAccount();

	const form = useForm<z.infer<typeof SignupValidation>>({
		resolver: zodResolver(SignupValidation),
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: '',
		},
	});

	const { getValues } = form;
	const formValues = getValues();
	const options = Object.keys(formValues).reduce<Record<string, { label: string }>>(
		(acc, key) => ({ ...acc, [key]: { label: `${key[0].toUpperCase()}${key.slice(1)}` } }),
		{},
	);

	async function onSubmit(values: z.infer<typeof SignupValidation>) {
		const newUser = await createUserAccount(values);
		if (!newUser) {
			return toast({
				title: 'Sign up failed. Please try again.',
			});
		}

		const session = await signInAccount({
			email: values.email,
			password: values.password,
		});
		if (!session) {
			return toast({
				title: 'Sign up failed. Please try again.',
			});
		}

		const isLoggedIn = await checkAuthUser();
		if (isLoggedIn) {
			form.reset();
			navigate('/');
		} else {
			return toast({
				title: 'Sign up failed. Please try again.',
			});
		}
	}

	return (
		<Form {...form}>
			<div className='flex-center flex-col sm:w-420'>
				<img src='/assets/images/logo.svg' alt='logo' />
				<h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>
				<p className='small-medium md:base-regular mt-2 text-light-3'>
					To use Snapgram, please enter your details
				</p>
				<form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 flex w-full flex-col gap-5'>
					{Object.keys(formValues).map((value) => (
						<FormField
							key={value}
							control={form.control}
							name={value as 'name' | 'username' | 'email' | 'password'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{options[value].label}</FormLabel>
									<FormControl>
										<Input type='text' className='shad-input' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}

					<Button type='submit' className='shad-button_primary'>
						{isPending ? (
							<div className='flex-center gap-2'>
								<Loader size='sm' /> Loading...
							</div>
						) : (
							'Sign up'
						)}
					</Button>
					<p className='text-small-regular mt-2 text-center text-light-2'>
						Already have an account?{' '}
						<Link to='/sign-in' className='text-small-semibold ml-1 text-primary-500'>
							Sign in
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};
