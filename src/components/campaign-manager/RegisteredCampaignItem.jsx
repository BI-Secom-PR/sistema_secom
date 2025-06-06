"use client"
import { Button } from "react-bootstrap"

const RegisteredCampaignItem = ({ campaign, colors, styles, isAbove4K, onEdit, onDelete }) => {
  const listItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: `1px solid ${colors.card.border}20`,
  }

  const statusIndicatorStyle = (isActive) => ({
    display: "inline-block",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: isActive ? colors.indicator.active : colors.indicator.inactive,
    marginRight: "10px",
  })

  const campaignInfoStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  }

  const campaignNameStyle = {
    fontSize: isAbove4K ? "1.4rem" : "15px",
    color: colors.text.primary,
    fontWeight: "500",
    marginLeft: "5px",
  }

  const campaignDetailsStyle = {
    fontSize: isAbove4K ? "1.1rem" : "12px",
    color: colors.text.secondary,
    marginLeft: "15px",
    marginTop: "4px",
  }

  const buttonContainerStyle = {
    display: "flex",
    gap: "8px",
  }

  const editButtonStyle = {
    backgroundColor: colors.button.bg,
    color: colors.button.text,
    border: "none",
    borderRadius: "12px",
    fontWeight: "500",
    transition: "background-color 0.2s",
    padding: "6px 16px",
    fontSize: isAbove4K ? "1.2rem" : "14px",
  }

  const deleteButtonStyle = {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "500",
    transition: "background-color 0.2s",
    padding: "6px 16px",
    fontSize: isAbove4K ? "1.2rem" : "14px",
  }

  return (
    <div style={listItemStyle}>
      <div style={campaignInfoStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={statusIndicatorStyle(campaign.active)}></span>
          <span style={campaignNameStyle}>{campaign.name}</span>
        </div>
        {campaign.items && campaign.items.length > 0 && (
          <div style={campaignDetailsStyle}>
            {campaign.items.length} associação(ões) • Plataformas:{" "}
            {[...new Set(campaign.items.map((item) => item.platform))].join(", ")}
          </div>
        )}
      </div>
      <div style={buttonContainerStyle}>
        <Button size="sm" style={editButtonStyle} onClick={() => onEdit(campaign.id)}>
          Editar
        </Button>
      </div>
    </div>
  )
}

export default RegisteredCampaignItem
