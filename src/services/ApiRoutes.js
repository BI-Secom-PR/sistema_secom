/**
 * ApiRoutes.js
 *
 * Este arquivo centraliza todas as rotas da API utilizadas no sistema.
 * Seguindo boas práticas, todas as URLs estão definidas como constantes,
 * facilitando a manutenção e evitando duplicação de código.
 */

// URL base da API
export const API_BASE_URL = "http://localhost:8080"

// Endpoints para autenticação
export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REFRESH_TOKEN: "/auth/refresh",
  LOGOUT: "/auth/logout",
}

// Endpoints para campanhas
export const CAMPAIGN_ROUTES = {
  BASE: "/campaigns",
  BY_ID: (id) => `/campaigns/${id}`,
  REGISTER: "/campaigns/register",
  METRICS: (id) => `/campaigns/${id}/metrics`,
  ACTIVE: "/campaigns/active",
  BY_DATE_RANGE: (startDate, endDate) => `/campaigns/range?start=${startDate}&end=${endDate}`,
}

// Endpoints para métricas
export const METRICS_ROUTES = {
  BASE: "/metrics",
  BY_PLATFORM: (platform) => `/metrics/platform/${platform}`,
  BY_DATE_RANGE: (startDate, endDate) => `/metrics/range?start=${startDate}&end=${endDate}`,
  SUMMARY: "/metrics/summary",
}

// Endpoints para usuários
export const USER_ROUTES = {
  BASE: "/users",
  BY_ID: (id) => `/users/${id}`,
  PROFILE: "/users/profile",
  CHANGE_PASSWORD: "/users/change-password",
}

// Endpoints para relatórios
export const REPORT_ROUTES = {
  BASE: "/reports",
  GENERATE: "/reports/generate",
  DOWNLOAD: (id) => `/reports/${id}/download`,
  BY_CAMPAIGN: (campaignId) => `/reports/campaign/${campaignId}`,
}

// Endpoints para configurações
export const CONFIG_ROUTES = {
  BASE: "/config",
  SYSTEM: "/config/system",
  NOTIFICATIONS: "/config/notifications",
}

// Função auxiliar para construir URLs completas
export const buildUrl = (endpoint) => `${API_BASE_URL}${endpoint}`

// Função para construir URLs com parâmetros de consulta
export const buildUrlWithParams = (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`)

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key])
    }
  })

  return url.toString()
}

// Exporta um objeto com todas as rotas para facilitar o uso
const ApiRoutes = {
  BASE_URL: API_BASE_URL,
  AUTH: AUTH_ROUTES,
  CAMPAIGNS: CAMPAIGN_ROUTES,
  METRICS: METRICS_ROUTES,
  USERS: USER_ROUTES,
  REPORTS: REPORT_ROUTES,
  CONFIG: CONFIG_ROUTES,
  buildUrl,
  buildUrlWithParams,
}

export default ApiRoutes
