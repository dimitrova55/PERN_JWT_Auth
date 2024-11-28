import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

function Dashboard () {
    const [user, setUser] = useState(null); 
    const navigate = useNavigate();
    const { logout } = useAuth();
    
    async function fetchData(){
        try {
            // console.log(localStorage.token);
            
            const response = await fetch("http://localhost:5000/user/dashboard", {
                method: "GET",
                headers: {
                    Authorization: localStorage.token
                },
            });    
            const data = await response.json();
            // console.log(data.user.name);            
            
            if (response.ok) {
                setUser(data.user.name)
                console.log(user);
                
            } else {
                await logout();
                navigate("/login", {replace: true});
            }
        } catch (error) {
            console.error(error.message)
        }
    
    }
    
    useEffect(() => {
        fetchData();
    })

    async function logUserOut(e) {
        e.preventDefault();
        await logout();
        navigate("/", {replace: true});
    }

    return(
        <>
        <h1>Hello {user}</h1>
        <button className="btn btn-primary" onClick={(e => logUserOut(e))}>Logout</button>
        </>
    );
}

export default Dashboard;