import { RouteObject } from 'react-router-dom';
import { importDynamicPublicPage, importDynamicPrivatePage } from './utils';

export const routes: RouteObject[] = [
	{
		lazy: () => importDynamicPublicPage('../_auth/AuthLayout'),
		children: [
			{
				path: '/sign-in',
				lazy: () => importDynamicPublicPage('../_auth/forms/SigninForm'),
			},
			{
				path: '/sign-up',
				lazy: () => importDynamicPublicPage('../_auth/forms/SignupForm'),
			},
		],
	},
	{
		lazy: () => importDynamicPrivatePage('../_root/RootLayout'),
		children: [
			{
				index: true,
				lazy: () => importDynamicPrivatePage('../_root/pages/home'),
			},
		],
	},
];
