/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 22 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Internal Imports
import App from './App.jsx';

// CSS File
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
