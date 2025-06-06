export const getCampaignManagerColors = (isDarkMode) => ({
  background: isDarkMode ? "#1a1a1a" : "#f5f5f5",
  card: {
    bg: isDarkMode ? "#2d2d2d" : "#ffffff",
    border: isDarkMode ? "#444444" : "#E2E8F0",
    gradient: isDarkMode
      ? "linear-gradient(135deg, #2d2d2d 0%, #3a3a3a 100%)"
      : "linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%)",
  },
  text: {
    primary: isDarkMode ? "#ffffff" : "#1E293B",
    secondary: isDarkMode ? "#94A3B8" : "#64748B",
  },
  button: {
    bg: "#0d6efd",
    text: "#ffffff",
  },
  indicator: {
    active: "#10b981",
    inactive: "#6b7280",
  },
  error: "#EF4444",
})

export const getCampaignManagerStyles = (colors, isAbove4K) => ({
  container: {
    backgroundColor: colors.background,
    padding: "20px",
    minHeight: "100vh",
    fontFamily: "'Rawline', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  title: {
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: "40px",
    fontSize: isAbove4K ? "2.5rem" : "24px",
    fontWeight: "600",
  },
  errorStyle: {
    padding: "16px",
    borderRadius: "8px",
    color: colors.error,
    backgroundColor: `${colors.error}10`,
    fontWeight: "500",
    marginBottom: "16px",
    fontSize: isAbove4K ? "1.75rem" : "1rem",
  },
  registerButtonStyle: {
    backgroundColor: colors.button.bg,
    color: colors.button.text,
    border: "none",
    borderRadius: "12px",
    fontWeight: "500",
    transition: "background-color 0.2s",
    padding: "8px 20px",
    fontSize: isAbove4K ? "1.2rem" : "14px",
    width: "100%",
    marginTop: "10px",
  },
})
