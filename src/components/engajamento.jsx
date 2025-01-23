import React from 'react'
import { Card } from 'react-bootstrap'
import { engagement } from '../data/engajamento'
import { ThumbsUp, MessageCircle, Eye, Share2 } from 'lucide-react'

const Engajamento = () => {
  return (
    <Card className="campaign-card h-100">
      <h2 className="h5 mb-4">Engajamento (Semanal)</h2>
      <div className="d-flex flex-column gap-5">
        <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <ThumbsUp size={20} />
            <span>Curtidas</span>
          </div>
          <span className="fs-6 fw-semibold">{engagement.likes.toLocaleString()}</span>
        </div>
        
        <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <MessageCircle size={20} />
            <span>Comentários</span>
          </div>
          <span className="fs-6 fw-semibold">{engagement.comments.toLocaleString()}</span>
        </div>

        <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Eye size={20} />
            <span>Visualizações</span>
          </div>
          <span className="fs-6 fw-semibold">{engagement.views.toLocaleString()}</span>
        </div>

        <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Share2 size={20} />
            <span className="share-text">Compartilhamentos</span>
          </div>
          <span className="fs-6 fw-semibold">{engagement.shares.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  )
}

export default Engajamento