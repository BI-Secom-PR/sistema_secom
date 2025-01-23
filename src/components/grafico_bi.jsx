import React from 'react'
import { Card } from 'react-bootstrap'

const Grafico_bi = () => {
  return (
    <>                  
        <Card className="h-100">
            <Card.Body>
                <iframe 
                    title="Dash único - SPP" 
                    width="100%" 
                    height="100%" 
                    src="https://app.powerbi.com/view?r=eyJrIjoiMzZhMjM0YWUtNjZjOC00YzIxLWIyZmItMzQ1Y2UwMDQ1MmUxIiwidCI6IjM4Nzc0ZWEwLTc0YjQtNGYxZC05N2RhLTM1ZDQzZmI5MDJmZCJ9&pageName=68e3d5a89455313e2c25" 
                    frameborder="0" 
                    allowFullScreen="true">
                </iframe>
            </Card.Body>
        </Card>
    </>
  )
}

export default Grafico_bi