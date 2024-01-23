import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [crediantials, setCrediantials] = useState({email: "", password: ""});
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://127.0.0.1:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email: crediantials.email, password:crediantials.password}),
          });
          let json = await response.json();
          console.log(json);
          if(json.success == true){
            //save the authToken and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert('success', `Logged in succesfully`)
          }
          else{
            props.showAlert('danger', 'sycjh');
          }
    }

    const onChange = (e)=>{
        setCrediantials({...crediantials, [e.target.name]: e.target.value})
    }

  return (
    <div>
    <div className="mt-3 container heading" >
        <h2>Login in to continue with iNoteBook</h2>
    </div>
      <form onSubmit={handleSubmit} >
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email"  className="form-control" id="email" name="email" value={crediantials.email}aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={crediantials.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  );
}

export default Login;
