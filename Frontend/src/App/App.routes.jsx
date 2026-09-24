import React from 'react'
import {createBrowserRouter} from "react-router"
import Login from '../Features/auth/pages/Login'
import Register from '../Features/auth/pages/Register'
import Dashboard from '../Features/chat/pages/Dashboard'
import Protected from '../Features/auth/components/Protected';
import { Navigate } from 'react-router'

const router = createBrowserRouter([
   {
     path:"/",
     element:<Protected> <Dashboard/></Protected>
   },
   {
     path:"/login",
     element:<Login/>,
   },

   {
    path:"/register",
    element:<Register/>,
   },
   {
    path:"/dashboard",
    element:<Navigate to="/" replace/>,
   }
   

])

export default router