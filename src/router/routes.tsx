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
						],
					},
				],
			},
		],
	},
];
