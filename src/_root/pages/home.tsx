import React from 'react';
import { Button } from '@/components/ui/button';

export const Component: React.FC = () => {
	console.log('home rendered');

	return (
		<div>
			<Button>Click me</Button>
		</div>
	);
};
