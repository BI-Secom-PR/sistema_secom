"use client"
import { Form } from "react-bootstrap"

const UnregisteredCampaignItem = ({ campaign, colors, styles, isAbove4K, onSelect }) => {
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
    flex: 1,
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

  const platformBadgeStyle = {
    backgroundColor: colors.button.bg,
    color: colors.button.text,
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "10px",
    fontWeight: "500",
    marginLeft: "10px",
  }

  const checkboxStyle = {
    cursor: "pointer",
    width: "18px",
    height: "18px",
    accentColor: colors.button.bg,
  }

  return (
    <div style={listItemStyle}>
      <div style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
        <Form.Check
          type="checkbox"
          checked={campaign.selected}
          onChange={() => onSelect(campaign.id)}
          style={{ marginRight: "10px", marginTop: "2px", ...checkboxStyle }}
        />
        <div style={campaignInfoStyle}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={statusIndicatorStyle(campaign.active)}></span>
            <span style={campaignNameStyle}>{campaign.name}</span>
            <span style={platformBadgeStyle}>{campaign.platform}</span>
          </div>
          <div style={campaignDetailsStyle}>Nome original: {campaign.originalName}</div>
        </div>
      </div>
    </div>
  )
}

export default UnregisteredCampaignItem
