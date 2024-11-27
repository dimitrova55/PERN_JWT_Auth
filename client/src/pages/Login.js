import React, { useEffect } from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';


/** React hooks can only be used inside React components or custom hooks. */

export async function action({ request }) {
  const formData = await request.formData();

  // to access the form data
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch('http://localhost:5000/auth/login', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    });
    
    const data = await response.json();
    // console.log(data);
    
    if (response.ok) {
      return { success: true, user: data.user, token: data.accessToken };
      // return redirect('/dashboard'); 
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.log("Login request failed:", error);
    return { success: false, error: "An error occurred. Please try again later." };
  }
}

function Login() {
  
  const { login } = useAuth();
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (actionData?.success) {
        // console.log(actionData);
        await login(actionData.token); // Set the user in the auth context
        navigate("/dashboard", { replace: true });
      } 
    }
    fetchData();    
  });
  

  return (
    <div className='container-sm mt-5' style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className='text-center my-3'>Login</h2>
        <Form method="post" >
                <div className='form-group mt-3'>
                    <label>Email:</label>
                    <input type="email" name="email" className='form-control my-3' required />
                </div>    
                <div className='form-group mt-3'>
                    <label>Password:</label>
                    <input type="password" name="password" className='form-control my-3' required />
                </div>
                        
                <button type="submit" className='btn btn-success btn-block form-control mt-3'>Login</button>
            </Form>
        {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
    </div>
  );
}

export default Login;