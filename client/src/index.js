import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider,} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import { action as loginAction } from './pages/Login';
import { action as registerAction } from './pages/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "/login",
    element: <Login/>,
    action: loginAction
  },
  {
    path: "/register",
    element: <Register/>,
    action: registerAction
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />      
    </AuthProvider>    
  </React.StrictMode>,
)

