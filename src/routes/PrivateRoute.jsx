"use client"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./AuthContext"

const PrivateRoute = () => {
  const { isAuthenticated, loading, checkAuth } = useAuth()

  console.log("=== PRIVATE ROUTE ===")
  console.log("Loading:", loading)
  console.log("IsAuthenticated:", isAuthenticated)

  // Se ainda está carregando, mostrar loading
  if (loading) {
    console.log("Ainda carregando autenticação...")
    return <div>Carregando...</div>
  }

  // Verificar autenticação novamente
  const authStatus = checkAuth()
  console.log("Status de autenticação verificado:", authStatus)

  // Se não está autenticado, redirecionar para login
  if (!authStatus) {
    console.log("Usuário não autenticado, redirecionando para login")
    return <Navigate to="/login" replace />
  }

  console.log("Usuário autenticado, permitindo acesso")
  return <Outlet />
}

export default PrivateRoute
