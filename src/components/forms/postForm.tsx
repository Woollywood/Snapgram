import React from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, InputTags } from '@/components/ui/inputs';
import { Textarea } from '@/components/ui/textarea';
import { FileUploader } from '@/components/shared/fileUploader';
import { IUpdatePost } from '@/types';
import { PostValidation } from '@/lib/validation';
import { useAuth } from '@/context/auth';
import { useToast } from '@/hooks/use-toast';
import { useCreatePost } from '@/lib/reactQuery';
import { Loader } from '@/components/shared/loader';

export const PostForm: React.FC<{ post?: IUpdatePost }> = ({ post }) => {
	const { toast } = useToast();
	const { user } = useAuth()!;

	const navigate = useNavigate();
	const { mutateAsync: createPost, isPending } = useCreatePost();

	const form = useForm<z.infer<typeof PostValidation>>({
		resolver: zodResolver(PostValidation),
		defaultValues: {
			caption: post ? post.caption : '',
			file: [],
			location: post ? post.location : '',
			tags: post ? post.tags : [],
		},
	});

	async function onSubmit(values: z.infer<typeof PostValidation>) {
		const newPost = await createPost({ ...values, creator: user?.$id! });
		console.log(newPost);

		if (!newPost) {
			toast({
				title: 'Please try again',
			});
		} else {
			navigate('/');
		}
	}

	const onUpdateTagsField = (tags: string[]) => {
		form.setValue('tags', tags);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full max-w-5xl flex-col gap-9'>
				<FormField
					control={form.control}
					name='caption'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>Caption</FormLabel>
							<FormControl>
								<Textarea className='shad-textarea custom-scrollbar' {...field} />
							</FormControl>
							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='file'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>Add Photos</FormLabel>
							<FormControl>
								<FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl || ''} />
							</FormControl>
							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>Add Location</FormLabel>
							<FormControl>
								<Input type='text' className='shad-input' {...field} />
							</FormControl>
							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='tags'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='shad-form_label'>Add Tags</FormLabel>
							<FormControl>
								<InputTags className='shad-input' {...field} onUpdate={onUpdateTagsField} />
							</FormControl>
							<FormMessage className='shad-form_message' />
						</FormItem>
					)}
				/>
				<div className='flex items-center justify-end gap-4'>
					<Button type='button' className='shad-button_dark_4'>
						Cancel
					</Button>
					<Button type='submit' className='shad-button_primary whitespace-nowrap'>
						{isPending && <Loader size='sm' />}Submit
					</Button>
				</div>
			</form>
		</Form>
	);
};
