import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider,} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import { action as loginAction } from './pages/Login';
import { action as registerAction } from './pages/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home page</h1>,
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
    // action: dashboardAction,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />      
    </AuthProvider>    
  </React.StrictMode>,
)

