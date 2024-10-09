import React from 'react';

interface Props {
	title: string;
	icon: string;
	alt: string;
}

export const Title: React.FC<Props> = ({ title, icon, alt }) => {
	return (
		<div className='flex-start w-full max-w-5xl justify-start gap-3'>
			<img src={icon} width={36} height={36} alt={alt} />
			<h2 className='h3-bold md:h2-bold w-full text-left'>{title}</h2>
		</div>
	);
};
