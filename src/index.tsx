import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'antd/dist/reset.css';

const root = document.getElementById('root');
if (root) {
    const reactDom = createRoot(root);
    reactDom.render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
}
