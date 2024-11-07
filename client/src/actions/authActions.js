import { redirect } from "react-router-dom";
import { useAuth } from "../AuthContext";

export async function loginAction ({request}) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });
        
        const parseResponse = await response.json();
        console.log(parseResponse);
        
        /**
        if(response.ok) {
            const { login } = useAuth();
            login(); // sets isAuthenticated to true
            return redirect("/dashboard");
        } else {
            const errorData = await response.json();
            return { error: errorData.error};
        }
        */
    } catch (error) {
        console.log(error);        
    }

    
}

export async function registerAction({request}) {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const response = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password}),
        });
    
        if(response.ok) {
            const { login } = useAuth();
            login();
            return redirect("/dashboard");
        } else {
            const errorData = await response.json();
            return {error: errorData.error}
        }
    } catch (error) {
        
    }

    
    
}