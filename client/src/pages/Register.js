import React, {useEffect} from 'react';
import { Form, useActionData, useNavigate } from 'react-router-dom';

export async function action({request}) {
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

        const data = await response.json();
            
        if (response.ok) {
            console.log(data);
            return { success: true, user: data.user };
        } else {
            return { success: false, error: data.message };
        }
        
    } catch (error) {
        console.log("Register request failed:", error);
        return { success: false, error: "An error occurred. Please try again later." };
    }   
}

function Register() {

    const actionData = useActionData();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
          if (actionData?.success) {
            // console.log("action data: ", actionData)
            navigate("/login", { replace: true });
          } // else throw an error
        }
        fetchData();    
      });


    return (
        <div className='container-sm mt-5' style={{ maxWidth: '500px', margin: '0 auto' }}>
            
            <h2 className='text-center my-3'>Register</h2>        
            <Form method="post">
                <div className='form-group mt-3'>
                    <label>Name:</label>
                    <input type="text" name="name" className='form-control my-3' required />
                </div>
                <div className='form-group mt-3'>
                    <label>Email:</label>
                    <input type="email" name="email" className='form-control my-3' required />
                </div>    
                <div className='form-group mt-3'>
                    <label>Password:</label>
                    <input type="password" name="password" className='form-control my-3' required />
                </div>
                        
                <button type="submit" className='btn btn-success btn-block form-control mt-3'>Register</button>
            </Form>
            {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
        </div>
    );
}

export default Register;