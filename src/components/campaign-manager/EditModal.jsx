"use client"
import { Modal, Button } from "react-bootstrap"

const EditModal = ({
  show,
  onHide,
  colors,
  isAbove4K,
  editingCampaign,
  editNewCampaignName,
  setEditNewCampaignName,
  onFinishEdit,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
      <Modal.Header
        closeButton
        style={{
          backgroundColor: colors.card.bg,
          borderBottom: `1px solid ${colors.card.border}`,
          padding: "16px",
        }}
      >
        <Modal.Title style={{ color: colors.text.primary, fontSize: "16px", fontWeight: "normal" }}>
          Editar Campanha
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          backgroundColor: colors.card.bg,
          padding: "16px",
        }}
      >
        <div>
          {editingCampaign && editingCampaign.items && editingCampaign.items.length > 0 ? (
            editingCampaign.items.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: `1px solid ${colors.card.border}`,
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: colors.indicator.active,
                    marginRight: "12px",
                  }}
                />
                <span style={{ color: colors.text.primary }}>{item.originalName}</span>
              </div>
            ))
          ) : (
            <div style={{ color: colors.text.secondary, textAlign: "center", padding: "20px" }}>
              Nenhum item associado a esta campanha.
            </div>
          )}

          <div style={{ marginTop: "24px", marginBottom: "24px" }}>
            <div
              style={{
                color: colors.text.secondary,
                fontSize: "12px",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              NOME DA CAMPANHA:
            </div>
            <input
              type="text"
              value={editNewCampaignName}
              onChange={(e) => setEditNewCampaignName(e.target.value)}
              placeholder="Digite o novo nome da campanha"
              style={{
                backgroundColor: colors.background === "#f5f5f5" ? "#3a3a3a" : colors.card.bg,
                padding: "12px",
                color: colors.text.primary,
                borderRadius: "8px",
                fontSize: "14px",
                width: "100%",
                border: `1px solid ${colors.card.border}`,
                outline: "none",
              }}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer
        style={{
          backgroundColor: colors.card.bg,
          borderTop: `1px solid ${colors.card.border}`,
          padding: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={onFinishEdit}
          disabled={!editNewCampaignName?.trim()}
          style={{
            backgroundColor: colors.button.bg,
            border: "none",
            borderRadius: "30px",
            padding: "8px 0",
            fontSize: "16px",
            width: "180px",
            color: colors.button.text,
            opacity: !editNewCampaignName?.trim() ? "0.7" : "1",
            cursor: !editNewCampaignName?.trim() ? "not-allowed" : "pointer",
          }}
        >
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal
