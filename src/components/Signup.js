import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Signup(props) {
    const [crediantials, setCrediantials] = useState({name: "", email: "", password:"", cpassword:""});
    let navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = crediantials;
        const response = await fetch(`http://127.0.0.1:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password}),
          });
          let json = await response.json();
          console.log(json);
          if(json.success === true){
            //save the authToken and redirect
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            props.showAlert('success', 'Account created succesfully');
          }
          else{
            props.showAlert('danger', json.error);
          }
    }

    const onChange = (e)=>{
        setCrediantials({...crediantials, [e.target.name]: e.target.value})
    }
  return (
    <div className='container'>
    <div className="heading">
        <h2>Signup to create an account</h2>
    </div>
      <form onSubmit={handleSubmit}>
      <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name='email'onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name='password'onChange={onChange}/>
  </div>
  <div class="mb-3">
    <label for="cpassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="cpassword" name='cpassword'onChange={onChange}/>
  </div>
  <button type="submit" class="btn btn-primary">Signup</button>
</form>
    </div>
  );
}

export default Signup;
