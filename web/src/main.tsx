import React from 'react';
import ReactDOM from 'react-dom/client';
import '../tailwind.css';
import App from './app';
import './global.less';
import { initLanguage } from './locales/config';

// React Dev Inspector: click-to-source helper, dev only.
// Dynamic import + import.meta.env.DEV lets Vite tree-shake it out of production builds.
const renderApp = async () => {
  if (import.meta.env.DEV) {
    const { gotoVSCode, Inspector } = await import('react-dev-inspector');
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <Inspector keys={['alt', 'c']} onInspectElement={gotoVSCode} />
        <App />
      </React.StrictMode>,
    );
  } else {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }
};

initLanguage().then(renderApp);
