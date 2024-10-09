import { RouteObject } from 'react-router-dom';
import { SignRoutes, PrivateRoutes } from './components';
import { Root } from '@/_root/Root';

export const routes: RouteObject[] = [
	{
		element: <Root />,
		children: [
			{
				element: <SignRoutes />,
				children: [
					{
						lazy: () => import('../_auth/AuthLayout'),
						children: [
							{
								path: '/sign-in',
								lazy: () => import('../_auth/forms/SigninForm'),
							},
							{
								path: '/sign-up',
								lazy: () => import('../_auth/forms/SignupForm'),
							},
						],
					},
				],
			},
			{
				element: <PrivateRoutes />,
				children: [
					{
						lazy: () => import('../_root/RootLayout'),
						children: [
							{
								index: true,
								lazy: () => import('../_root/pages/home'),
							},
							{
								path: '/explore',
								lazy: () => import('../_root/pages/explore'),
							},
							{
								path: '/saved',
								lazy: () => import('../_root/pages/saved'),
							},
							{
								path: '/users',
								lazy: () => import('../_root/pages/users'),
							},
							{
								path: '/create-post',
								lazy: () => import('../_root/pages/createPost'),
							},
							{
								path: '/update-post/:id',
								lazy: () => import('../_root/pages/updatePost'),
							},
							{
								path: '/posts/:id',
								lazy: () => import('../_root/pages/post'),
							},
							{
								path: '/profile/:id/*',
								lazy: () => import('../_root/pages/profile'),
							},
							{
								path: '/update-profile/:id',
								lazy: () => import('../_root/pages/updateProfile'),
							},
						],
					},
				],
			},
		],
	},
];
