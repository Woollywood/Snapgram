import React, { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { Button } from '@/components/ui/button';

interface Props {
	fieldChange: (files: File[]) => void;
	mediaUrl: string;
}

export const FileUploader: React.FC<Props> = ({ fieldChange, mediaUrl }) => {
	const [file, setFile] = useState<File[]>([]);
	const [fileUrl, setFileUrl] = useState(mediaUrl);

	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[]) => {
			setFile(acceptedFiles);
			fieldChange(acceptedFiles);
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
				<>
					<div className='flex w-full flex-1 justify-center p-5 lg:p-10'>
						<div className='relative'>
							<img src={fileUrl} alt='image' className='file_uploader-img' />
						</div>
					</div>
					<p className='file_uploader-label'>Click or drag photo to replace</p>
				</>
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
