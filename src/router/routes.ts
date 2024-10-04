import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
	{
		path: '/',
		lazy: () => import('../pages/home'),
	},
	{
		path: '/about',
		lazy: () => import('../pages/about'),
	},
];
