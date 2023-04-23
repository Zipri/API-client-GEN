import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css';
const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
