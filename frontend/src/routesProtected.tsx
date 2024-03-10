import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/authContext'

type Props = { children: React.ReactNode }

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation()
  const { isLoggedIn } = useAuth()
  return isLoggedIn() ? (
    <> {children} </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default ProtectedRoute
