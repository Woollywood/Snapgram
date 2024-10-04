import { RouteObject } from 'react-router-dom';
import { importDynamicPage } from './utils';

export const routes: RouteObject[] = [
	// { path: '/', element: <div>eqewq</div> },
	{
		path: '/',
		lazy: () => importDynamicPage('../_root/pages/home'),
	},
	{
		path: '/sign-in',
		lazy: () => importDynamicPage('../_auth/forms/SigninForm', { private: false }),
	},
	{
		path: '/sign-up',
		lazy: () => importDynamicPage('../_auth/forms/SignupForm', { private: false }),
	},
];
