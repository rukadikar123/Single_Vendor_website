import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ requiredRole }) {
    const {user}=useSelector(state=> state?.auth)


    
    if(!user) return <Navigate to='/login' />
    if (requiredRole && user.role.toLowerCase() !== requiredRole.toLowerCase()) return <Navigate to="/" />;

    
  return (
    <Outlet/>
  )
}

export default ProtectedRoute