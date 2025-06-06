import { Card, Spinner } from "react-bootstrap"

const CampaignCard = ({ title, campaigns, loading, error, colors, styles, isAbove4K, children }) => {
  const cardStyle = {
    borderRadius: "16px",
    border: `1px solid ${colors.card.border}`,
    background: colors.card.gradient,
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)",
    marginBottom: "30px",
    overflow: "hidden",
  }

  const cardHeaderStyle = {
    backgroundColor: "transparent",
    borderBottom: `1px solid ${colors.card.border}20`,
    padding: isAbove4K ? "20px 24px" : "16px 20px",
    fontSize: isAbove4K ? "1.75rem" : "18px",
    fontWeight: "600",
    color: colors.text.primary,
  }

  const cardBodyStyle = {
    padding: isAbove4K ? "20px 24px" : "16px 20px",
  }

  const emptyStateStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
    color: colors.text.secondary,
    textAlign: "center",
    flex: 1,
    fontSize: isAbove4K ? "1.75rem" : "1rem",
  }

  return (
    <Card style={cardStyle}>
      <div style={cardHeaderStyle}>{title}</div>
      <Card.Body style={cardBodyStyle}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <Spinner animation="border" style={{ color: colors.button.bg }} />
          </div>
        ) : error ? (
          <div style={styles.errorStyle}>{error}</div>
        ) : campaigns.length === 0 ? (
          <div style={emptyStateStyle}>
            <p>Nenhuma campanha disponível.</p>
          </div>
        ) : (
          children
        )}
      </Card.Body>
    </Card>
  )
}

export default CampaignCard
