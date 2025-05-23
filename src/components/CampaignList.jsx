import { Card, Button, Form, Spinner } from "react-bootstrap";

export const CampaignList = ({
  title,
  campaigns,
  loading,
  onSelect,
  onEdit,
  onRegister,
  styles,
  isUnregistered = false,
}) => {
  return (
    <Card style={styles.cardStyle}>
      <div style={styles.cardHeaderStyle}>{title}</div>
      <Card.Body style={styles.cardBodyStyle}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <Spinner animation="border" style={{ color: styles.colors.button.bg }} />
          </div>
        ) : campaigns.length === 0 ? (
          <div style={styles.emptyStateStyle}>
            <p>{isUnregistered ? "Nenhuma campanha não cadastrada disponível." : "Nenhuma campanha cadastrada."}</p>
          </div>
        ) : (
          <>
            {campaigns.map(c => (
              <div key={c.id} style={styles.listItemStyle}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {isUnregistered && (
                    <Form.Check
                      type="checkbox"
                      checked={c.selected}
                      onChange={() => onSelect(c.id)}
                      style={{ marginRight: "10px", ...styles.checkboxStyle }}
                    />
                  )}
                  <span style={styles.statusIndicatorStyle(c.active)}></span>
                  <span style={styles.campaignNameStyle}>{c.name}</span>
                </div>
                {!isUnregistered && (
                  <Button size="sm" style={styles.editButtonStyle} onClick={() => onEdit(c.id)}>
                    Editar
                  </Button>
                )}
              </div>
            ))}
            {isUnregistered && (
              <Button style={styles.registerButtonStyle} onClick={onRegister}>
                Cadastrar
              </Button>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};