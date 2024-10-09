import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';

export const FileUploader: React.FC<{ fielChange: any; mediaUrl: any }> = ({ fielChange, mediaUrl }) => {
	const [file, setFile] = useState<File[]>([]);
	const [fileUrl, setFileUrl] = useState('');

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setFile(acceptedFiles);
			fielChange(acceptedFiles);
			setFileUrl(URL.createObjectURL(acceptedFiles[0]));
		},
		[file],
	);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/png': [],
			'image/jpg': [],
			'image/svg': [],
			'image/jpeg': [],
		},
	});

	return (
		<div className='flex-center flex cursor-pointer flex-col rounded-xl bg-dark-3' {...getRootProps()}>
			<input {...getInputProps()} className='cursor-pointer' />
			{fileUrl ? (
				<div>test 1</div>
			) : (
				<div className='file_uploader-box'>
					<img src='/assets/icons/file-upload.svg' width={96} height={77} alt='file-upload' />
					<h3 className='base-medium mb-2 mt-6 text-light-2'>Drag photo here</h3>
					<p className='small-regular mb-6 text-light-4'>SVG, PNG, JPG</p>
					<Button className='shad-button_dark-4'>Select from computer</Button>
				</div>
			)}
		</div>
	);
};
