import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export default function ProtectedRoute({ children }){
    const { user, token } = useAuth();

    if(!user || !token) {
        return <Navigate to="/login" />
    }

    return children;

}