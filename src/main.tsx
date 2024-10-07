import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';

import { QueryProvider } from './lib/reactQuery';
import { AuthProvider } from './context/auth';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</QueryProvider>
	</StrictMode>,
);
