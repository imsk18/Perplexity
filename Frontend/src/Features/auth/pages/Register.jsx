import React, { useState } from 'react'
import FormGroup from '../components/FormGroup'
import "../styles/register.scss";
import { Link } from 'react-router';
import { useAuth } from '../Hooks/use.auth';

const Register = () => {

  const {handleRegister} = useAuth()
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:""
  })
  

  function handleChange(e){
    const {name,value} = e.target;
    setFormData((prev)=>({
      ...prev,[name]:value
    }))


  }

 async function handleSubmit(e){
    e.preventDefault()

    try{
       await handleRegister(formData)
       console.log("registration successfully");

    }catch(err){
      console.log(err.message);
    }

   

  }
  return (
    <div className='register-page'>
      <div className="container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <FormGroup
          label="username"
          name="username"
          type='text'
          value={formData.username}
          placeholder="enter your username"
          onChange={handleChange}

           />

          <FormGroup
          label="email"
          name="email"
          type='email'
          value={formData.email}
          placeholder="enter your email address"
          onChange={handleChange}

           />
          <FormGroup
          label="password"
          name="password"
          type='password'
          value={formData.password}
          placeholder="enter your password"
          onChange={handleChange}

           />

           <button className='btn'>Register</button>
            <p>don't have an account <Link to="/login">login</Link></p>

        </form>
      </div>

    </div>
  )
}

export default Register