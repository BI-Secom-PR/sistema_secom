"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const checkAuth = () => {
    console.log("=== VERIFICANDO AUTENTICAÇÃO ===")

    // Verifica no sessionStorage primeiro
    let token = sessionStorage.getItem("token")
    let expiresAt = sessionStorage.getItem("expiresAt")
    let userId = sessionStorage.getItem("_id")

    // Se não encontrar, verifica no localStorage
    if (!token) {
      token = localStorage.getItem("token")
      expiresAt = localStorage.getItem("expiresAt")
      userId = localStorage.getItem("_id")
    }

    console.log("Token encontrado:", !!token)
    console.log("ExpiresAt:", expiresAt)
    console.log("UserId:", userId)

    if (token && expiresAt) {
      // Verificar se o token não expirou
      const now = new Date()
      const expiration = new Date(expiresAt)

      console.log("Data atual:", now)
      console.log("Data de expiração:", expiration)
      console.log("Token válido:", expiration > now)

      if (expiration > now) {
        setIsAuthenticated(true)
        console.log("Usuário autenticado!")
        return true
      } else {
        console.log("Token expirado, removendo dados...")
        // Token expirado, limpar dados
        clearAuthData()
        setIsAuthenticated(false)
        return false
      }
    } else {
      console.log("Token ou expiração não encontrados")
      setIsAuthenticated(false)
      return false
    }
  }

  const clearAuthData = () => {
    // Limpar sessionStorage
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("expiresAt")
    sessionStorage.removeItem("_id")
    sessionStorage.removeItem("_role")
    sessionStorage.removeItem("email")

    // Limpar localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("expiresAt")
    localStorage.removeItem("_id")
    localStorage.removeItem("_role")
    localStorage.removeItem("email")
  }

  useEffect(() => {
    console.log("AuthContext: Inicializando verificação de autenticação")
    checkAuth()
    setLoading(false)
  }, [])

  // Função para atualizar o estado de autenticação
  const updateAuthStatus = () => {
    console.log("Atualizando status de autenticação...")
    const isAuth = checkAuth()
    setIsAuthenticated(isAuth)
    return isAuth
  }

  const logout = () => {
    console.log("Fazendo logout...")
    clearAuthData()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        updateAuthStatus,
        logout,
        loading,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
