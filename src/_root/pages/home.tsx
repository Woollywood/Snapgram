import React from 'react';
import { Button } from '@/components/ui/button';

const Component: React.FC = () => {
	console.log('home rendered');

	return (
		<div>
			<Button>Click me</Button>
		</div>
	);
};

export default Component;
