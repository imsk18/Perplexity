import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import router from './App.routes'
import "../Features/auth/shared/global.scss"
import { useAuth } from '../Features/auth/Hooks/use.auth'

const App = () => {
  const auth = useAuth()
  useEffect(()=>{
    auth.handleGetMe()

  },[])
  return (
    <RouterProvider router={router} />
  )
}

export default App