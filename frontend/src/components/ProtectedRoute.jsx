import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
    const user=useSelector(state=> state.auth.user)

    if(!user) return <Navigate to='/login' />
    if(user.role !== 'admin') return <Navigate to='/' />

  return (
    <Outlet/>
  )
}

export default ProtectedRoute