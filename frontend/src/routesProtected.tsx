import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/authContext'

type Props = { children: React.ReactNode }

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation()
  const { isLoggedIn } = useAuth()

  // Se o usuário estiver logado e tentar acessar a página de login, redirecione para a tela inicial
  if (isLoggedIn() && location.pathname === '/login') {
    return <Navigate to="/" replace />
  }

  // Se o usuário estiver logado, renderize o conteúdo da rota protegida
  if (isLoggedIn()) {
    return <> {children} </>
  } else {
    // Caso contrário, redirecione para a página de login
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}

export default ProtectedRoute
