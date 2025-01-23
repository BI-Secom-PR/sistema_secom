import React from 'react'
import { Card } from 'react-bootstrap'

const Grafico_bi = () => {
  return (
    <>
        <Card className="campaign-card">
            <Card.Body>
                <iframe 
                    title="Dash único - SPP" 
                    width="100%" 
                    height="440" 
                    src="https://app.powerbi.com/view?r=eyJrIjoiMzZhMjM0YWUtNjZjOC00YzIxLWIyZmItMzQ1Y2UwMDQ1MmUxIiwidCI6IjM4Nzc0ZWEwLTc0YjQtNGYxZC05N2RhLTM1ZDQzZmI5MDJmZCJ9&pageName=144e992f08ec0d110802&ctid=38774ea0-74b4-4f1d-97da-35d43fb902fd&pageView=fitToWidth"
                    frameborder="0" 
                    allowFullScreen="false"
                >          
                </iframe>

            </Card.Body>
        
        </Card>
    </>
  )
}

export default Grafico_bi