import { createRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';
import { setBaseUrl } from '@workspace/api-client-react';

import './index.css';

// VITE_API_SERVER_URL is injected by Vercel at build time via the
// api-server service binding. On Replit / local dev it is absent and
// the client falls back to relative /api/* URLs handled by the dev proxy.
if (import.meta.env.VITE_API_SERVER_URL) {
  setBaseUrl(import.meta.env.VITE_API_SERVER_URL);
}

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
