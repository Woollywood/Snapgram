import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, InputTags } from '@/components/ui/inputs';
import { Textarea } from '@/components/ui/textarea';
import { FileUploader } from '@/components/shared/fileUploader';
import { IUpdatePost } from '@/types';

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
});

export const PostForm: React.FC<{ post?: IUpdatePost }> = ({ post }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

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
								<FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
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
								<Input type='text' className='shad-input' />
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
								<InputTags className='shad-input' />
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
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
};
