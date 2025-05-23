import { Modal, Form, Button } from "react-bootstrap";

export const RegistrationModal = ({
  show,
  onHide,
  campaigns,
  selectedCampaignName,
  setSelectedCampaignName,
  newCampaignName,
  setNewCampaignName,
  useNewName,
  setUseNewName,
  onFinish,
  styles,
  registeredCampaigns,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
      <Modal.Header closeButton style={{ backgroundColor: styles.colors.card.bg, borderBottom: `1px solid ${styles.colors.card.border}` }}>
        <Modal.Title style={{ color: styles.colors.text.primary }}>Cadastrar Campanhas</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: styles.colors.card.bg, padding: "20px" }}>
        <Form>
          <div style={{ marginBottom: "30px" }}>
            <h5 style={{ color: styles.colors.text.primary }}>Campanhas selecionadas para cadastro:</h5>
            <div style={{ backgroundColor: styles.colors.background, padding: "15px", borderRadius: "8px", marginTop: "10px" }}>
              {campaigns.filter(c => c.selected).map(c => (
                <div key={c.id} style={{ padding: "10px", marginBottom: "5px", backgroundColor: styles.colors.card.bg, borderRadius: "6px" }}>
                  <span style={styles.statusIndicatorStyle(true)}></span>
                  <span style={{ color: styles.colors.text.primary }}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
          <h5 style={{ color: styles.colors.text.primary, marginBottom: "15px" }}>NOME DA CAMPANHA:</h5>
          <Form.Check
            type="radio"
            id="useExisting"
            name="campaignNameOption"
            label="Usar nome existente"
            checked={!useNewName}
            onChange={() => setUseNewName(false)}
            style={{ marginBottom: "15px", color: styles.colors.text.primary }}
          />
          {!useNewName && (
            <Form.Group className="mb-4">
              <Form.Select
                value={selectedCampaignName}
                onChange={e => setSelectedCampaignName(e.target.value)}
                style={{
                  backgroundColor: styles.colors.card.bg,
                  color: styles.colors.text.primary,
                  border: `1px solid ${styles.colors.card.border}`,
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <option value="">Selecione um nome</option>
                {registeredCampaigns.filter(c => c.active).map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
          <Form.Check
            type="radio"
            id="useNew"
            name="campaignNameOption"
            label="Digitar novo nome"
            checked={useNewName}
            onChange={() => setUseNewName(true)}
            style={{ marginBottom: "15px", color: styles.colors.text.primary }}
          />
          {useNewName && (
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="Digite aqui o novo nome para a campanha"
                value={newCampaignName}
                onChange={e => setNewCampaignName(e.target.value)}
                style={{
                  backgroundColor: styles.colors.card.bg,
                  color: styles.colors.text.primary,
                  border: `1px solid ${styles.colors.card.border}`,
                  borderRadius: "8px",
                  padding: "12px",
                }}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: styles.colors.card.bg, borderTop: `1px solid ${styles.colors.card.border}` }}>
        <Button 
          variant="secondary" 
          onClick={onHide}
          style={{ 
            backgroundColor: styles.colors.card.border, 
            border: "none", 
            color: styles.colors.button.text,
            borderRadius: "12px",
            padding: "8px 20px",
          }}
        >
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          onClick={onFinish}
          style={{
            backgroundColor: styles.colors.button.bg,
            border: "none",
            color: styles.colors.button.text,
            borderRadius: "12px",
            padding: "8px 20px",
          }}
        >
          Cadastrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};