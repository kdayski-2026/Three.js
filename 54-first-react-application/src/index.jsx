import './style.css';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.querySelector('#root'));

root.render(
  <div>
    <App clickersCount={3}>
      <h1>My first react app</h1>
      <h2>And a fancy subtitle</h2>
    </App>
  </div>,
);
