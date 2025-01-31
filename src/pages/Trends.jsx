import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { User, Home, LayoutDashboard, BarChart3, Clock, LogOut, BarChart2, Search, TrendingUp } from 'lucide-react';
import govLogo from '../assets/gov-logo.png';
import xLogo from '../assets/x-logo.png';
import googleLogo from '../assets/google-logo.png';
import trendingImage from '../assets/trending.png';

function Trends() {
 const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
 const [selectedMenu, setSelectedMenu] = useState("Trending");

 useEffect(() => {
  // Criar iframe para a lista
  const iframeList = document.createElement('iframe');
  iframeList.style.width = '100%';
  iframeList.style.height = '400px';
  iframeList.style.border = 'none';

  // Criar iframe para o gráfico donut
  const iframeDonut = document.createElement('iframe');
  iframeDonut.style.width = '100%';
  iframeDonut.style.height = '400px';
  iframeDonut.style.border = 'none';

  // Criar iframe para consultas relacionadas
  const iframeQueries = document.createElement('iframe');
  iframeQueries.style.width = '100%';
  iframeQueries.style.height = '400px';
  iframeQueries.style.border = 'none';

  // Criar iframe para circular progress
  const iframeCircularProgress = document.createElement('iframe');
  iframeCircularProgress.style.width = '100%';
  iframeCircularProgress.style.height = '400px';
  iframeCircularProgress.style.border = 'none';

  // Criar iframe para o novo related queries
  const iframeNewRelatedQueries = document.createElement('iframe');
  iframeNewRelatedQueries.style.width = '100%';
  iframeNewRelatedQueries.style.height = '400px';
  iframeNewRelatedQueries.style.border = 'none';

  // Referências para os containers
  const containerList = document.getElementById('google-trends-container');
  const containerDonut = document.getElementById('google-trends-donut-container');
  const containerQueries = document.getElementById('google-trends-queries-container');
  const containerCircularProgress = document.getElementById('google-trends-circular-progress-container');
  const containerNewRelatedQueries = document.getElementById('google-trends-new-related-queries-container');

  // Widget para a lista
  if (containerList) {
    containerList.appendChild(iframeList);
    const iframeListDoc = iframeList.contentDocument || iframeList.contentWindow.document;
    iframeListDoc.open();
    iframeListDoc.write(`
      <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/3975_RC01/embed_loader.js"></script>
      <script type="text/javascript">
        trends.embed.renderWidget(
          "BR_cu_oh8DNIcBAAAmqM_en", 
          "fe_list_27839ab3-151f-464c-a334-6f0554c2534e", 
          {"guestPath":"https://trends.google.com.br:443/trends/embed/"}
        );
      </script>
      <style>
        body { margin: 0; padding: 0; }
      </style>
    `);
    iframeListDoc.close();
  }

  // Widget para o gráfico donut
  if (containerDonut) {
    containerDonut.appendChild(iframeDonut);
    const iframeDonutDoc = iframeDonut.contentDocument || iframeDonut.contentWindow.document;
    iframeDonutDoc.open();
    iframeDonutDoc.write(`
      <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/3975_RC01/embed_loader.js"></script>
      <script type="text/javascript">
        trends.embed.renderWidget(
          "BR_cu_oh8DNIcBAAAmqM_en", 
          "fe_donut_chart_a08ec8f7-f60f-4371-b32a-c989353fdc7d", 
          {"guestPath":"https://trends.google.com.br:443/trends/embed/"}
        );
      </script>
      <style>
        body { margin: 0; padding: 0; }
      </style>
    `);
    iframeDonutDoc.close();
  }

  // Widget para consultas relacionadas
  if (containerQueries) {
    containerQueries.appendChild(iframeQueries);
    const iframeQueriesDoc = iframeQueries.contentDocument || iframeQueries.contentWindow.document;
    iframeQueriesDoc.open();
    iframeQueriesDoc.write(`
      <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/3975_RC01/embed_loader.js"></script>
      <script type="text/javascript">
        trends.embed.renderWidget(
          "BR_cu_oh8DNIcBAAAmqM_en", 
          "fe_related_queries_1cf5e585-773f-4b77-a48b-aca73d95f1b0", 
          {"guestPath":"https://trends.google.com.br:443/trends/embed/"}
        );
      </script>
      <style>
        body { margin: 0; padding: 0; }
      </style>
    `);
    iframeQueriesDoc.close();
  }

  // Widget para circular progress
  if (containerCircularProgress) {
    containerCircularProgress.appendChild(iframeCircularProgress);
    const iframeCircularProgressDoc = iframeCircularProgress.contentDocument || iframeCircularProgress.contentWindow.document;
    iframeCircularProgressDoc.open();
    iframeCircularProgressDoc.write(`
      <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/3975_RC01/embed_loader.js"></script>
      <script type="text/javascript">
        trends.embed.renderWidget(
          "BR_cu_oh8DNIcBAAAmqM_en", 
          "fe_circular_progress_d897aa4c-daf4-490c-957a-eb38a036f772", 
          {"guestPath":"https://trends.google.com.br:443/trends/embed/"}
        );
      </script>
      <style>
        body { margin: 0; padding: 0; }
      </style>
    `);
    iframeCircularProgressDoc.close();
  }

  // Widget para o novo related queries
  if (containerNewRelatedQueries) {
    containerNewRelatedQueries.appendChild(iframeNewRelatedQueries);
    const iframeNewRelatedQueriesDoc = iframeNewRelatedQueries.contentDocument || iframeNewRelatedQueries.contentWindow.document;
    iframeNewRelatedQueriesDoc.open();
    iframeNewRelatedQueriesDoc.write(`
      <script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/3975_RC01/embed_loader.js"></script>
      <script type="text/javascript">
        trends.embed.renderWidget(
          "BR_cu_oh8DNIcBAAAmqM_en", 
          "fe_related_queries_07e81ff0-870e-4c6b-a4d4-ca5a1172f8af", 
          {"guestPath":"https://trends.google.com.br:443/trends/embed/"}
        );
      </script>
      <style>
        body { margin: 0; padding: 0; }
      </style>
    `);
    iframeNewRelatedQueriesDoc.close();
  }

  // Limpar os iframes ao desmontar o componente
  return () => {
    if (containerList && iframeList) {
      containerList.removeChild(iframeList);
    }
    if (containerDonut && iframeDonut) {
      containerDonut.removeChild(iframeDonut);
    }
    if (containerQueries && iframeQueries) {
      containerQueries.removeChild(iframeQueries);
    }
    if (containerCircularProgress && iframeCircularProgress) {
      containerCircularProgress.removeChild(iframeCircularProgress);
    }
    if (containerNewRelatedQueries && iframeNewRelatedQueries) {
      containerNewRelatedQueries.removeChild(iframeNewRelatedQueries);
    }
  };
}, []);

 const trendingX = [
   { rank: 1, topic: "Neymar", tweets: "252K" },
   { rank: 2, topic: "Raissa", tweets: "41K" },
   { rank: 3, topic: "$DYOR", tweets: "38K" },
   { rank: 4, topic: "#BBB25", tweets: "226K" },
   { rank: 5, topic: "Klopp", tweets: "16K" },
   { rank: 6, topic: "TADEU", tweets: "21K" },
   { rank: 7, topic: "Mateus", tweets: "36K" },
   { rank: 8, topic: "DeepSeek", tweets: "751K" },
   { rank: 9, topic: "Abel", tweets: "29K" },
   { rank: 10, topic: "#VoleINoSporTV", tweets: "21K" }
 ];

 const trendingGoogle = [
   { rank: 1, topic: "Big Brother Brasil", searches: "5M+" },
   { rank: 2, topic: "Carnaval 2024", searches: "2.8M+" },
   { rank: 3, topic: "Copa São Paulo", searches: "1.5M+" },
   { rank: 4, topic: "Mega Sena resultado", searches: "1.2M+" },
   { rank: 5, topic: "Previsão do tempo", searches: "980K+" },
   { rank: 6, topic: "Oscar 2024 nomeados", searches: "850K+" },
   { rank: 7, topic: "Jogos de hoje", searches: "720K+" },
   { rank: 8, topic: "FGTS", searches: "680K+" },
   { rank: 9, topic: "Imposto de Renda 2024", searches: "580K+" },
   { rank: 10, topic: "Enem resultado", searches: "520K+" }
 ];

 return (
   <div className="d-flex" style={{ fontFamily: 'Roboto, sans-serif' }}>
     
     {/* Main Content */}
     <Container fluid className="py-4 px-5 bg-light">
       <div className="d-flex justify-content-between align-items-center mb-5">
         <h1 style={{ 
           fontSize: '2rem', 
           fontFamily: 'Rhodium Libre',
           textAlign: 'center',
           width: '100%'
         }}>
           Trending Topics
         </h1>        
        </div>

       <Row className="g-4">
         {/* X Card */}
         <Col md={3}>
           <Card className="border-0 h-100 rounded-3">
             <Card.Body style={{ padding: '1rem' }}>
               <div className="d-flex align-items-center gap-2 mb-2">
                 <Image src={xLogo} alt="X Logo" style={{ width: '20px', height: '20px' }} />
                 <h3 className="mb-0" style={{ fontSize: '1.1rem', fontWeight: '500' }}>X</h3>
               </div>
               {trendingX.map((trend, index) => (
                 <div 
                   key={index}
                   className="d-flex justify-content-between align-items-center py-2 border-bottom"
                   style={{ cursor: 'pointer' }}
                 >
                   <div className="d-flex gap-2">
                     <span className="text-secondary" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{trend.rank}</span>
                     <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{trend.topic}</span>
                   </div>
                   <span className="text-secondary" style={{ fontSize: '0.8rem' }}>{trend.tweets}</span>
                 </div>
               ))}
               <div className="mt-2">
                 <Button 
                   variant="danger" 
                   className="w-100 py-2"
                   style={{ 
                     backgroundColor: '#ff4131', 
                     border: 'none',
                     fontSize: '0.9rem'
                   }}
                 >
                   Ver mais no X
                 </Button>
               </div>
             </Card.Body>
           </Card>
         </Col>

         {/* Google Card */}
         <Col md={3}>
           <Card className="border-0 h-100 rounded-3">
             <Card.Body style={{ padding: '1rem' }}>
               <div className="d-flex align-items-center gap-2 mb-2">
                 <Image src={googleLogo} alt="Google Logo" style={{ width: '20px', height: '20px' }} />
                 <h3 className="mb-0" style={{ fontSize: '1.1rem', fontWeight: '500' }}>Google Search</h3>
               </div>
               {trendingGoogle.map((trend, index) => (
                 <div 
                   key={index}
                   className="d-flex justify-content-between align-items-center py-2 border-bottom"
                   style={{ cursor: 'pointer' }}
                 >
                   <div className="d-flex gap-2">
                     <span className="text-secondary" style={{ fontSize: '0.9rem', fontWeight: '500' }}>{trend.rank}</span>
                     <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{trend.topic}</span>
                   </div>
                   <span className="text-secondary" style={{ fontSize: '0.8rem' }}>{trend.searches}</span>
                 </div>
               ))}
               <div className="mt-2">
                 <Button 
                   variant="danger" 
                   className="w-100 py-2"
                   style={{ 
                     backgroundColor: '#ff4131', 
                     border: 'none',
                     fontSize: '0.9rem'
                   }}
                 >
                   Ver mais no Google
                 </Button>
               </div>
             </Card.Body>
           </Card>
         </Col>

         {/* Google Trends List Card */}
         <Col md={3}>
           <Card className="border-0 h-100 rounded-3">
             <Card.Body style={{ padding: '1rem' }}>
               <div className="d-flex align-items-center gap-2 mb-2">
                 <Image src={googleLogo} alt="Google Trends Logo" style={{ width: '20px', height: '20px' }} />
                 <h3 className="mb-0" style={{ fontSize: '1.1rem', fontWeight: '500' }}>Google Trends - Lista</h3>
               </div>
               <div 
                 id="google-trends-container" 
                 style={{ 
                   width: '100%',
                   height: '400px',
                   overflow: 'hidden'
                 }}
               />
             </Card.Body>
           </Card>
         </Col>

         {/* Google Trends Donut Card */}
         <Col md={3}>
           <Card className="border-0 h-100 rounded-3">
             <Card.Body style={{ padding: '1rem' }}>
               <div className="d-flex align-items-center gap-2 mb-2">
                 <Image src={googleLogo} alt="Google Trends Logo" style={{ width: '20px', height: '20px' }} />
                 <h3 className="mb-0" style={{ fontSize: '1.1rem', fontWeight: '500' }}>Google Trends - Gráfico</h3>
               </div>
               <div 
                 id="google-trends-donut-container" 
                 style={{ 
                   width: '100%',
                   height: '400px',
                   overflow: 'hidden'
                 }}
               />
             </Card.Body>
           </Card>
         </Col>
         <Col md={3}>
          <Card className="border-0 h-100 rounded-3">
            <Card.Body style={{ padding: '1rem' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Image src={googleLogo} alt="Google Trends Logo" style={{ width: '20px', height: '20px' }} />
                <h3 className="mb-0" style={{ fontSize: '1.1rem', fontWeight: '500' }}>Google Trends - Queries</h3>
              </div>
              <div 
                id="google-trends-queries-container" 
                style={{ 
                  width: '100%',
                  height: '400px',
                  overflow: 'hidden'
                }}
              />
            </Card.Body>
          </Card>
        </Col>
                {/* Google Trends Circular Progress Card */}
                <Col md={6}>
                  <Card className="border-0 h-100 rounded-3">
                    <Card.Body style={{ padding: '1rem' }}>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Image src={googleLogo} alt="Google Trends Logo" style={{ width: '20px', height: '20px' }} />
                        <h3 className="mb-0" style={{ fontSize: '1.1rem', fontWeight: '500' }}>Google Trends - Progress</h3>
                      </div>
                      <div 
                        id="google-trends-circular-progress-container" 
                        style={{ 
                          width: '100%',
                          height: '400px',
                          overflow: 'hidden'
                        }}
                      />
                    </Card.Body>
                  </Card>
                </Col>
                {/* Google Trends - Related Queries 2 */}
              <Col md={3}>
                <Card className="border-0 h-100 rounded-3">
                  <Card.Body style={{ padding: '1rem' }}>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Image src={googleLogo} alt="Google Trends Logo" style={{ width: '20px', height: '20px' }} />
                      <h3 className="mb-0" style={{ fontSize: '1.1rem', fontWeight: '500' }}>Google Trends - Related Queries</h3>
                    </div>
                    <div 
                      id="google-trends-new-related-queries-container" 
                      style={{ 
                        width: '100%',
                        height: '400px',
                        overflow: 'hidden'
                      }}
                    />
                  </Card.Body>
                </Card>
              </Col>

       </Row>
     </Container>
   </div>
 );
}

export default Trends;