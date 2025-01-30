import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import chartImg from '../assets/chart-analysis.png';
import govLogo from '../assets/gov-logo.png';

function Cadastro() {
 const [showPassword, setShowPassword] = useState(false);

 return (
   <Container fluid className="vh-100">
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
           <div style={{ display: 'flex', justifyContent: 'center' }}>
             <Image 
               src={chartImg} 
               alt="Chart Analysis" 
               style={{ 
                 width: 'auto',
                 maxWidth: '100%',
                 height: 'auto'
               }}
             />
           </div>
         </div>
       </Col>

       <Col md={6} className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
         <div className="d-flex justify-content-between align-items-center mb-5">
         <h2 style={{ 
            fontSize: '1.75rem',
            fontFamily: 'Rhodium Libre',
            marginBottom: '2rem'
          }}>
            Cadastro novo usuário
          </h2>
           <Image 
          src={govLogo} 
          alt="Governo Federal" 
          style={{ width: '180px' }}  // Aumentado de 140px para 180px
          />
         </div>

         <Form style={{ maxWidth: '500px' }}>
           <Form.Group className="mb-4">
             <Form.Label>Nome</Form.Label>
             <Form.Control 
               type="text" 
               placeholder="Seu nome"
               className="py-3"
               style={{ backgroundColor: '#f2f2f2', border: 'none' }}
             />
           </Form.Group>

           <Form.Group className="mb-4">
             <Form.Label>Email</Form.Label>
             <Form.Control 
               type="email" 
               placeholder="exemplo@gmail.com"
               className="py-3"
               style={{ backgroundColor: '#f2f2f2', border: 'none' }}
             />
           </Form.Group>

           <Form.Group className="mb-4">
             <Form.Label>CPF</Form.Label>
             <Form.Control 
               type="text" 
               placeholder="Seu CPF"
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

           <Button 
             variant="danger" 
             className="w-100 py-3"
             style={{ 
               backgroundColor: '#ff3b30',
               border: 'none',
               borderRadius: '8px'
             }}
           >
             Cadastrar
           </Button>
         </Form>
       </Col>
     </Row>
   </Container>
 );
}

export default Cadastro;