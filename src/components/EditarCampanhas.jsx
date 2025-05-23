import { Modal, Button } from "react-bootstrap";

export const EditModal = ({
  show,
  onHide,
  campaign,
  editNewCampaignName,
  setEditNewCampaignName,
  onFinish,
  styles,
}) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      backdrop="static" 
      size="lg"
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: styles.colors.card.bg,
          borderBottom: `1px solid ${styles.colors.card.border}`,
          padding: "16px",
        }}
      >
        <Modal.Title style={{ color: styles.colors.text.primary, fontSize: "16px", fontWeight: "normal" }}>
          Editar Campanha
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body 
        style={{ 
          backgroundColor: styles.colors.card.bg, 
          padding: "16px",
        }}
      >
        <div>
          {campaign && campaign.items && campaign.items.length > 0 ? (
            campaign.items.map((item, index) => (
              <div 
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: `1px solid ${styles.colors.card.border}`,
                }}
              >
                <div 
                  style={{ 
                    width: "10px", 
                    height: "10px", 
                    borderRadius: "50%", 
                    backgroundColor: styles.colors.indicator.active,
                    marginRight: "12px",
                  }}
                />
                <span style={{ color: styles.colors.text.primary }}>
                  {item.originalName}
                </span>
              </div>
            ))
          ) : (
            <div style={{ color: styles.colors.text.secondary, textAlign: "center", padding: "20px" }}>
              Nenhum item associado a esta campanha.
            </div>
          )}
          
          <div style={{ marginTop: "24px", marginBottom: "24px" }}>
            <div style={{ color: styles.colors.text.secondary, fontSize: "12px", marginBottom: "8px", textTransform: "uppercase" }}>
              NOME DA CAMPANHA:
            </div>
            <input
              type="text"
              value={editNewCampaignName}
              onChange={e => setEditNewCampaignName(e.target.value)}
              placeholder="Digite o novo nome da campanha"
              style={{
                backgroundColor: styles.colors.card.bg,
                padding: "12px",
                color: styles.colors.text.primary,
                borderRadius: "8px",
                fontSize: "14px",
                width: "100%",
                border: `1px solid ${styles.colors.card.border}`,
                outline: "none",
              }}
            />
          </div>
        </div>
      </Modal.Body>
      
      <Modal.Footer style={{ 
        backgroundColor: styles.colors.card.bg, 
        borderTop: `1px solid ${styles.colors.card.border}`,
        padding: "16px",
        display: "flex",
        justifyContent: "center",
      }}>
        <Button 
          onClick={onFinish}
          disabled={!editNewCampaignName?.trim()}
          style={{
            backgroundColor: styles.colors.button.bg,
            border: "none",
            borderRadius: "30px",
            padding: "8px 0",
            fontSize: "16px",
            width: "180px",
            color: styles.colors.button.text,
            opacity: !editNewCampaignName?.trim() ? "0.7" : "1",
            cursor: !editNewCampaignName?.trim() ? "not-allowed" : "pointer",
          }}
        >
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};