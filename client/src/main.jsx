/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 22 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Internal Imports
import App from './App.jsx';
import { AuthProvider } from './context/auth-context/index.jsx';
import { InstructorProvider } from './context/instructor-context/index.jsx';
import { StudentProvider } from './context/student-context/index.jsx';

// CSS File
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <InstructorProvider>
          <StudentProvider>
            <App />
          </StudentProvider>
        </InstructorProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
