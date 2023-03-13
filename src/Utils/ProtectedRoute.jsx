import React from 'react'
import { Navigate } from 'react-router-dom'
import useMyStore from '../Context'

function ProtectedRoute({children}) {

  let {isAdminLoggedIn} = useMyStore((state) => state)

  if(!isAdminLoggedIn) {
    return <Navigate to="/register" />
  }
  return (
    children
  )
}

export default ProtectedRoute