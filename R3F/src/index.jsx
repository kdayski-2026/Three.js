import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

document.documentElement.classList.add(import.meta.env.PROD ? 'env-prod' : 'env-dev');
createRoot(document.getElementById('root')).render(<App />);
