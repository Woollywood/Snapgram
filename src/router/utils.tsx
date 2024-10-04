import React from 'react';
import { Navigate } from 'react-router-dom';

interface Options {
	private: boolean;
}

export const importDynamicPage = async (
	src: string,
	opt: Options = { private: true },
): Promise<{ Component: () => React.JSX.Element }> => {
	const auth = false;

	let Component: (() => React.JSX.Element) | null = null;
	if (opt.private) {
		Component = auth
			? (await import(/* @vite-ignore */ src)).default
			: () => React.createElement(Navigate, { to: '/sign-in' });
	} else {
		Component = (await import(/* @vite-ignore */ src)).default;
	}

	return { Component: Component! };
};

export const importDynamicPublicPage = async (src: string): Promise<{ Component: () => React.JSX.Element }> => {
	return await importDynamicPage(src, { private: false });
};

export const importDynamicPrivatePage = async (src: string): Promise<{ Component: () => React.JSX.Element }> => {
	return await importDynamicPage(src, { private: true });
};
