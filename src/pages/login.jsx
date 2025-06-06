"use client"

import { Row, Col, Form, Button, Image } from "react-bootstrap"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../routes/AuthContext"
import ApiBase from "../services/ApiBase"
import dashboardImg from "../assets/dashboard_login.png"
import govLogo from "../assets/gov-logo.png"

const Login = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [stayLogged, setStayLogged] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorEmail, setErrorEmail] = useState("")
  const [errorSenha, setErrorSenha] = useState("")
  const [generalError, setGeneralError] = useState("")
  const navigate = useNavigate()
  const { updateAuthStatus } = useAuth()

  // Função para extrair informações do token JWT
  const parseJwt = (token) => {
    try {
      // Remover o prefixo "Bearer " se existir
      const tokenPart = token.startsWith("Bearer ") ? token.slice(7) : token

      // Decodificar o token
      const base64Url = tokenPart.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      )

      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error("Erro ao decodificar token:", error)
      return {}
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    setErrorEmail("")
    setErrorSenha("")
    setGeneralError("")

    try {
      // Usar o formato correto que funcionou
      const payload = { email, password: senha }
      console.log("Enviando payload:", payload)

      const response = await ApiBase.post("/auth/login", payload)
      console.log("Resposta da API:", response.data)

      if (response.data && response.data.token) {
        // Extrair informações do usuário do token JWT
        const tokenData = parseJwt(response.data.token)
        console.log("Dados extraídos do token:", tokenData)

        const storage = stayLogged ? localStorage : sessionStorage

        // Salvar o token e a data de expiração
        storage.setItem("token", response.data.token)
        storage.setItem("expiresAt", response.data.expiresAt)

        // Salvar informações do usuário extraídas do token
        if (tokenData.id) storage.setItem("_id", tokenData.id)
        if (tokenData.email) storage.setItem("email", tokenData.email)
        if (tokenData.role) storage.setItem("_role", tokenData.role)

        // Salvar o email usado no login caso não esteja no token
        if (!tokenData.email) storage.setItem("email", email)

        console.log("Dados salvos no storage")
        console.log("Token:", storage.getItem("token"))
        console.log("ExpiresAt:", storage.getItem("expiresAt"))
        console.log("ID:", storage.getItem("_id"))

        // Atualizar o contexto de autenticação
        console.log("Atualizando contexto de autenticação...")
        const authUpdated = updateAuthStatus()
        console.log("Contexto atualizado:", authUpdated)

        console.log("Redirecionando para /home...")
        navigate("/home", { replace: true })
      } else {
        setGeneralError("Resposta inválida da API - token não encontrado")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)

      if (error.response) {
        const errorData = error.response.data
        console.error("Error data completo:", errorData)

        // Extrair mensagens de erro do array
        let errorMessages = []
        if (Array.isArray(errorData.message)) {
          errorMessages = errorData.message
          console.log("Mensagens de erro:", errorMessages)
        } else if (typeof errorData.message === "string") {
          errorMessages = [errorData.message]
        } else if (typeof errorData.error === "string") {
          errorMessages = [errorData.error]
        }

        // Mostrar todas as mensagens de erro
        if (errorMessages.length > 0) {
          setGeneralError(errorMessages.join(". "))
        } else {
          // Tratamento baseado no status HTTP
          switch (error.response.status) {
            case 400:
              setGeneralError("Dados inválidos. Verifique email e senha.")
              break
            case 401:
              setErrorEmail("Email ou senha incorretos")
              break
            case 404:
              setGeneralError("Endpoint não encontrado")
              break
            case 500:
              setGeneralError("Erro interno do servidor")
              break
            default:
              setGeneralError(`Erro ${error.response.status}: ${error.response.statusText}`)
          }
        }
      } else if (error.request) {
        setGeneralError("Erro de conexão - servidor não respondeu")
      } else {
        setGeneralError(`Erro inesperado: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row className="h-100" style={{ fontFamily: "Rawline" }}>
      <Col md={6} className="d-none d-md-flex flex-column p-4" style={{ backgroundColor: "white" }}>
        <div className="d-flex flex-column justify-content-center h-100">
          <h1 style={{ fontSize: "2rem", textAlign: "center", marginBottom: "2rem" }}>Dashboards SECOM</h1>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Image
              src={dashboardImg || "/placeholder.svg"}
              alt="Dashboard"
              style={{ width: "auto", maxWidth: "100%", height: "auto", marginLeft: "-16rem" }}
            />
          </div>
        </div>
      </Col>

      <Col md={6} className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
        <Image
          src={govLogo || "/placeholder.svg"}
          alt="Governo Federal"
          style={{ width: "280px", marginBottom: "3rem" }}
          className="d-block mx-auto"
        />

        <Form style={{ maxWidth: "500px", margin: "0 auto" }} onSubmit={handleLogin}>
          {/* Mostrar erro geral se houver */}
          {generalError && (
            <div className="alert alert-danger mb-3" role="alert">
              <strong>Erro:</strong> {generalError}
            </div>
          )}

          <Form.Group className="mb-4">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              placeholder="Usuário de login"
              className="py-3"
              style={{ backgroundColor: "#f2f2f2", border: "none" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errorEmail}
              required
            />
            <Form.Control.Feedback type="invalid">{errorEmail}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Senha</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                className="py-3"
                style={{ backgroundColor: "#f2f2f2", border: "none" }}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                isInvalid={!!errorSenha}
                required
              />
              <Button
                variant="link"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  padding: 0,
                  color: "#6c757d",
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
              <Form.Control.Feedback type="invalid">{errorSenha}</Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-4 d-flex align-items-center gap-2">
            <Form.Check
              type="switch"
              id="stay-logged"
              checked={stayLogged}
              onChange={(e) => setStayLogged(e.target.checked)}
            />
            <Form.Label htmlFor="stay-logged" className="mb-0">
              Permanecer logado
            </Form.Label>
          </Form.Group>

          <Button
            variant="danger"
            className="w-100 py-3 mb-2"
            style={{ backgroundColor: "#FF0000", border: "none", borderRadius: "8px" }}
            type="submit"
            disabled={loading || !email || !senha}
          >
            {loading ? "Carregando..." : "Login"}
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default Login
