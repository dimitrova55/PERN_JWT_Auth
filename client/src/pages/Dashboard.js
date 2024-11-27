import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [name, setName] = useState("")

    async function getName() {

        // const navigate = useNavigate(); 

        try {
            console.log(localStorage.token);
            
            const response = await fetch("http://localhost:5000/user/dashboard", {
                method: "GET",
                headers: {
                    Authorization: localStorage.token
                },
            });

            const data = await response.json();
            // console.log(data);
            if (response.ok) {
                console.log(data); 

            } else if (response.status === 401) {
    
                // Check the specific error message
                if (data.message === "Access token expired.") {
                    console.warn("Token expired. Logging out...");
                    alert("Your session has expired. Please log in again.");
                } else if (data.message === "Access token invalid") {
                    console.warn("Token invalid. Logging out...");
                    alert("Invalid token detected. Please log in again.");
                }
    
                // Remove token and redirect to login
                localStorage.removeItem("token");
                // navigate("/login", { replace: true });
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getName();
    })

    return(
        <>
        <h1>Dashboard</h1>
        </>
    );
}

export default Dashboard;