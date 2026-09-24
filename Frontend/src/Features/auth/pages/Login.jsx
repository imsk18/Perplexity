import { useState } from 'react'
import React from 'react'
import FormGroup from '../components/FormGroup'
import '../styles/login.scss'
import {Link} from "react-router"
import { useAuth } from '../Hooks/use.auth'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'


const Login = () => {
  const user  = useSelector(state => state.auth.user);
  const loading  = useSelector(state => state.auth.loading);

  const {handleLogin} = useAuth()
  const navigate = useNavigate()

  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  function handleOnchange(e){
    const {name,value} = e.target
   setFormData((prev)=>({
    ...prev,[name]:value
   }))
  }


  async function handleSubmit(e){
    e.preventDefault()
    

    console.log(formData.email);
    console.log(formData.password);
    try{
      
      await handleLogin(formData);
      console.log("login successful");
      navigate("/")

     


    }catch(err){
      console.log(err.message);
    }

    
     if(!loading && user){
        console.log("USER LOGGED IN → REDIRECT");
        return <Navigate to ="/" replace />
      }

    



  }
  return (
    <main className='login-page'>
      <div className="container">
        <h1>login</h1>
        
          <form  onSubmit={handleSubmit}>
             <FormGroup
          value={formData.email}
          name="email"
          label="email"
          type="email"
          placeholder="enter your email"
          
          onChange= {handleOnchange}
         
          />

          <FormGroup
          name ="password"
          type="password"
          value={formData.password}
          label="password"
          placeholder="enter your password"
          onChange={handleOnchange}
          />
          <button className='btn' type='submit'>login</button>
          <p>don't have an account <Link to="/register">register</Link></p>
          </form>
          
         
          

        </div>
      
    </main>
  )
}

export default Login
