import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, replace } from 'react-router'

const Protected = ({children}) => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading);

     console.log("PROTECTED USER:", user);
  console.log("PROTECTED LOADING:", loading);

    if(loading){
        return <div>loading</div>
    }
    if(!user){
       return <Navigate to="/login" replace />
    }
    
        

  return children
}

export default Protected