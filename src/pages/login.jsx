import { Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import dashboardImg from '../assets/dashboard_login.png';
import govLogo from '../assets/gov-logo.png';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
        <Row className="h-100">
        <Col md={6} className="d-none d-md-flex flex-column p-4" style={{ backgroundColor: 'white' }}>
          <div className="d-flex flex-column justify-content-center h-100">
            <h1 style={{ 
              fontFamily: 'Rhodium Libre',
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              Dashboards SECOM
            </h1>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Image 
                src={dashboardImg} 
                alt="Dashboard" 
                style={{ 
                  width: 'auto',
                  maxWidth: '90%',
                  height: 'auto',
                  marginLeft: '-1rem'
                }}
              />
            </div>
          </div>
        </Col>

        <Col md={6} className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
          <Image 
            src={govLogo} 
            alt="Governo Federal" 
            style={{ width: '280px', marginBottom: '3rem' }}
            className="d-block mx-auto"
          />

          <Form style={{ maxWidth: '500px', margin: '0 auto' }}>
            <Form.Group className="mb-4">
              <Form.Label>Login</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Usuário de login"
                className="py-3"
                style={{ backgroundColor: '#f2f2f2', border: 'none' }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Senha</Form.Label>
              <div className="position-relative">
                <Form.Control 
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  className="py-3"
                  style={{ backgroundColor: '#f2f2f2', border: 'none' }}
                />
                <Button
                  variant="link"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    padding: 0,
                    color: '#6c757d'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-4 d-flex align-items-center gap-2">
              <Form.Check type="switch" id="stay-logged" />
              <Form.Label htmlFor="stay-logged" className="mb-0">
                Permanecer logado
              </Form.Label>
            </Form.Group>

            <Button 
              variant="danger" 
              className="w-100 py-3 mb-2"
              style={{ 
                backgroundColor: '#ff3b30',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Login