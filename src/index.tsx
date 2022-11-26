import React from 'react';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');
if (root) {
    const reactDom = createRoot(root);
    reactDom.render(<div>Hello world</div>);
}
