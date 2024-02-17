import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/assets/css/normalise.scss';
import 'src/assets/css/base.scss';

import { ThemeProvider } from '@mui/material';
import App from './App';
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// Would add wrappers for redux, error boundaries, etc here
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);
