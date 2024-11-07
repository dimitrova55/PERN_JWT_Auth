import React from 'react';
import { Form, useActionData } from 'react-router-dom';

function Register() {
  const actionData = useActionData();

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