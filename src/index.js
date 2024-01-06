import { createRoot } from 'react-dom/client';

import App from './components/app';

import './index.css';

console.log('123');
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
