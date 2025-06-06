"use client"
import { Modal, Form, Button } from "react-bootstrap"

const RegistrationModal = ({
  show,
  onHide,
  colors,
  isAbove4K,
  unregisteredCampaigns,
  registeredCampaigns,
  useNewName,
  setUseNewName,
  selectedCampaignName,
  setSelectedCampaignName,
  newCampaignName,
  setNewCampaignName,
  onFinishRegistration,
}) => {
  // Verificação correta do modo escuro
  const isDarkMode = colors.background !== "#f5f5f5"

  const statusIndicatorStyle = (isActive) => ({
    display: "inline-block",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: isActive ? "#10b981" : "#6b7280",
    marginRight: "10px",
  })

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
      <Modal.Header
        closeButton
        style={{ backgroundColor: colors.card.bg, borderBottom: `1px solid ${colors.card.border}` }}
      >
        <Modal.Title style={{ color: colors.text.primary }}>Cadastrar Campanhas</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: colors.card.bg, padding: "20px" }}>
        <Form>
          <div style={{ marginBottom: "30px" }}>
            <h5 style={{ color: colors.text.primary }}>Campanhas selecionadas para cadastro:</h5>
            <div
              style={{
                backgroundColor: isDarkMode ? "#2a2a2a" : "#f8f9fa",
                border: `1px solid ${colors.card.border}`,
                padding: "15px",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            >
              {unregisteredCampaigns
                .filter((c) => c.selected)
                .map((c) => (
                  <div
                    key={c.id}
                    style={{
                      padding: "12px",
                      marginBottom: "8px",
                      backgroundColor: isDarkMode ? "#404040" : "#ffffff",
                      border: `1px solid ${colors.card.border}`,
                      borderRadius: "8px",
                      boxShadow: isDarkMode ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <span style={statusIndicatorStyle(true)}></span>
                    <span
                      style={{
                        color: colors.text.primary,
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {c.name}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <h5 style={{ color: colors.text.primary, marginBottom: "15px" }}>NOME DA CAMPANHA:</h5>
          <Form.Check
            type="radio"
            id="useExisting"
            name="campaignNameOption"
            label="Usar nome existente"
            checked={!useNewName}
            onChange={() => setUseNewName(false)}
            style={{ marginBottom: "15px", color: colors.text.primary }}
          />
          {!useNewName && (
            <Form.Group className="mb-4">
              <Form.Select
                value={selectedCampaignName}
                onChange={(e) => setSelectedCampaignName(e.target.value)}
                style={{
                  backgroundColor: isDarkMode ? "#3a3a3a" : colors.card.bg,
                  color: colors.text.primary,
                  border: `1px solid ${colors.card.border}`,
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <option value="">Selecione um nome</option>
                {registeredCampaigns
                  .filter((c) => c.active)
                  .map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
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
            style={{ marginBottom: "15px", color: colors.text.primary }}
          />
          {useNewName && (
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="Digite aqui o novo nome para a campanha"
                value={newCampaignName}
                onChange={(e) => setNewCampaignName(e.target.value)}
                style={{
                  backgroundColor: isDarkMode ? "#3a3a3a" : colors.card.bg,
                  color: colors.text.primary,
                  border: `1px solid ${colors.card.border}`,
                  borderRadius: "8px",
                  padding: "12px",
                }}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: colors.card.bg, borderTop: `1px solid ${colors.card.border}` }}>
        <Button
          variant="secondary"
          onClick={onHide}
          style={{
            backgroundColor: isDarkMode ? "#444444" : "#6c757d",
            border: "none",
            color: colors.button.text,
            borderRadius: "12px",
            padding: "8px 20px",
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={onFinishRegistration}
          style={{
            backgroundColor: colors.button.bg,
            border: "none",
            color: colors.button.text,
            borderRadius: "12px",
            padding: "8px 20px",
          }}
        >
          Cadastrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RegistrationModal
