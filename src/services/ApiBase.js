import axios from "axios"
import { API_BASE_URL } from "./ApiRoutes"

// Utilitários para gerenciar cookies
const CookieUtils = {
  // Função para definir cookie
  setCookie: (name, value, days = 7, options = {}) => {
    let expires = ""
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = "; expires=" + date.toUTCString()
    }

    const defaultOptions = {
      path: "/",
      secure: window.location.protocol === "https:",
      sameSite: "lax", // Mudei para 'lax' para melhor compatibilidade com CORS
    }

    const cookieOptions = { ...defaultOptions, ...options }

    let cookieString = `${name}=${value || ""}${expires}; path=${cookieOptions.path}`

    if (cookieOptions.secure) {
      cookieString += "; secure"
    }

    if (cookieOptions.sameSite) {
      cookieString += `; samesite=${cookieOptions.sameSite}`
    }

    document.cookie = cookieString
  },

  // Função para obter cookie
  getCookie: (name) => {
    const nameEQ = name + "="
    const ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === " ") c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  },

  // Função para remover cookie
  removeCookie: (name, path = "/") => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`
  },

  // Função para verificar se cookie existe
  hasCookie: (name) => {
    return CookieUtils.getCookie(name) !== null
  },
}

// Criar instância do axios configurada para trabalhar com cookies
const ApiBase = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  // IMPORTANTE: Habilitar envio de cookies nas requisições
  withCredentials: true,
})

// Interceptor para adicionar token nas requisições
ApiBase.interceptors.request.use(
  (config) => {
    console.log("🚀 Fazendo requisição:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
    })
    console.log(config)

    // Buscar token nos cookies
    const token = CookieUtils.getCookie("auth_token")

    if (token) {
      // Adicionar token no header Authorization
      config.headers.Authorization = `Bearer ${token}`
      console.log("🔐 Token adicionado à requisição")
    } else {
      console.log("⚠️ Nenhum token encontrado nos cookies")
    }

    return config
  },
  (error) => {
    console.error("❌ Erro no interceptor de requisição:", error)
    return Promise.reject(error)
  },
)

// Interceptor para tratar respostas e erros
ApiBase.interceptors.response.use(
  (response) => {
    console.log("✅ Resposta recebida:", {
      status: response.status,
      url: response.config.url,
      dataKeys: Object.keys(response.data || {}),
    })

    // O backend NestJS pode definir cookies automaticamente via Set-Cookie header
    // Mas também podemos salvar dados adicionais nos cookies do frontend
    if (response.data?.token) {
      console.log("🔄 Novo token recebido, salvando nos cookies")
      CookieUtils.setCookie("auth_token", response.data.token, 7)

      // Salvar data de expiração se fornecida
      if (response.data?.expiresAt) {
        CookieUtils.setCookie("auth_expires", response.data.expiresAt, 7)
      }

      // Salvar dados do usuário se fornecidos
      if (response.data?.user) {
        const user = response.data.user
        if (user.id) CookieUtils.setCookie("user_id", user.id, 7)
        if (user.email) CookieUtils.setCookie("user_email", user.email, 7)
        if (user.role) CookieUtils.setCookie("user_role", user.role, 7)
      }
    }

    return response
  },
  (error) => {
    console.error("❌ Erro na resposta:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
    })

    // Se erro 401 (não autorizado), limpar cookies de autenticação
    if (error.response?.status === 401) {
      console.log("🔓 Token expirado ou inválido, limpando cookies")
      AuthCookies.clearAuthData()

      // Redirecionar para login se não estiver na página de login
      if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
        console.log("🔄 Redirecionando para login")
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  },
)

// Funções utilitárias para autenticação
export const AuthCookies = {
  // Salvar dados de autenticação nos cookies
  saveAuthData: (authData, stayLogged = false) => {
    const days = stayLogged ? 30 : 7 // 30 dias se "permanecer logado", senão 7 dias

    console.log("💾 Salvando dados de autenticação nos cookies:", {
      stayLogged,
      days,
      hasToken: !!authData.token,
    })

    if (authData.token) {
      CookieUtils.setCookie("auth_token", authData.token, days)
    }

    if (authData.expiresAt) {
      CookieUtils.setCookie("auth_expires", authData.expiresAt, days)
    }

    // Dados do usuário podem vir diretamente ou dentro de um objeto 'user'
    const userData = authData.user || authData

    if (userData.id || userData._id) {
      CookieUtils.setCookie("user_id", userData.id || userData._id, days)
    }

    if (userData.email) {
      CookieUtils.setCookie("user_email", userData.email, days)
    }

    if (userData.role || userData._role) {
      CookieUtils.setCookie("user_role", userData.role || userData._role, days)
    }
  },

  // Obter dados de autenticação dos cookies
  getAuthData: () => {
    const authData = {
      token: CookieUtils.getCookie("auth_token"),
      expiresAt: CookieUtils.getCookie("auth_expires"),
      userId: CookieUtils.getCookie("user_id"),
      email: CookieUtils.getCookie("user_email"),
      role: CookieUtils.getCookie("user_role"),
    }

    console.log("📖 Dados de autenticação dos cookies:", {
      hasToken: !!authData.token,
      hasExpires: !!authData.expiresAt,
      hasUserId: !!authData.userId,
      hasEmail: !!authData.email,
    })

    return authData
  },

  // Verificar se usuário está autenticado
  isAuthenticated: () => {
    const token = CookieUtils.getCookie("auth_token")
    const expiresAt = CookieUtils.getCookie("auth_expires")

    if (!token) {
      console.log("🔍 Nenhum token encontrado nos cookies")
      return false
    }

    if (expiresAt) {
      const now = new Date()
      const expiration = new Date(expiresAt)

      if (expiration <= now) {
        console.log("⏰ Token expirado, removendo cookies")
        AuthCookies.clearAuthData()
        return false
      }
    }

    console.log("✅ Usuário autenticado via cookies")
    return true
  },

  // Limpar dados de autenticação dos cookies
  clearAuthData: () => {
    console.log("🧹 Limpando dados de autenticação dos cookies")
    CookieUtils.removeCookie("auth_token")
    CookieUtils.removeCookie("auth_expires")
    CookieUtils.removeCookie("user_id")
    CookieUtils.removeCookie("user_email")
    CookieUtils.removeCookie("user_role")
  },

  // Fazer logout
  logout: async () => {
    console.log("👋 Fazendo logout")

    try {
      // Tentar fazer logout no backend (se houver endpoint)
      await ApiBase.post("/auth/logout")
    } catch (error) {
      console.log("⚠️ Erro ao fazer logout no backend:", error.message)
    }

    // Limpar cookies do frontend
    AuthCookies.clearAuthData()

    // Redirecionar para login
    window.location.href = "/login"
  },
}

export default ApiBase
export { CookieUtils }
