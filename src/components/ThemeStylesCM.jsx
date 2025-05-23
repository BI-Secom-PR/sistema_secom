import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const useThemeStyles = () => {
  const { isDarkMode } = useTheme();
  const [isAbove4K, setIsAbove4K] = useState(false);

  useEffect(() => {
    const checkResolution = () => {
      setIsAbove4K(window.innerWidth > 3840 || window.innerHeight > 2160);
    };
    checkResolution();
    window.addEventListener("resize", checkResolution);
    return () => window.removeEventListener("resize", checkResolution);
  }, []);

  const getColors = () => ({
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
  });

  const colors = getColors();

  const cardStyle = {
    borderRadius: "16px",
    border: `1px solid ${colors.card.border}`,
    background: colors.card.gradient,
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)",
    marginBottom: "30px",
    overflow: "hidden",
  };
  const cardHeaderStyle = {
    backgroundColor: "transparent",
    borderBottom: `1px solid ${colors.card.border}20`,
    padding: isAbove4K ? "20px 24px" : "16px 20px",
    fontSize: isAbove4K ? "1.75rem" : "18px",
    fontWeight: "600",
    color: colors.text.primary,
  };
  const cardBodyStyle = {
    padding: isAbove4K ? "20px 24px" : "16px 20px",
  };
  const listItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: `1px solid ${colors.card.border}20`,
  };
  const statusIndicatorStyle = (isActive) => ({
    display: "inline-block",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: isActive ? colors.indicator.active : colors.indicator.inactive,
    marginRight: "10px",
  });
  const buttonBase = {
    backgroundColor: colors.button.bg,
    color: colors.button.text,
    border: "none",
    borderRadius: "12px",
    fontWeight: "500",
    transition: "background-color 0.2s",
  };
  const editButtonStyle = {
    ...buttonBase,
    padding: "6px 16px",
    fontSize: isAbove4K ? "1.2rem" : "14px",
  };
  const registerButtonStyle = {
    ...buttonBase,
    padding: "8px 20px",
    fontSize: isAbove4K ? "1.2rem" : "14px",
    width: "100%",
    marginTop: "10px",
  };
  const campaignNameStyle = {
    fontSize: isAbove4K ? "1.4rem" : "15px",
    color: colors.text.primary,
    fontWeight: "500",
    marginLeft: "5px",
  };
  const checkboxStyle = {
    cursor: "pointer",
    width: "18px",
    height: "18px",
    accentColor: colors.button.bg,
  };
  const errorStyle = {
    padding: "16px",
    borderRadius: "8px",
    color: colors.error,
    backgroundColor: `${colors.error}10`,
    fontWeight: "500",
    marginBottom: "16px",
    fontSize: isAbove4K ? "1.75rem" : "1rem",
  };
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
  };

  return {
    colors,
    cardStyle,
    cardHeaderStyle,
    cardBodyStyle,
    listItemStyle,
    statusIndicatorStyle,
    editButtonStyle,
    registerButtonStyle,
    campaignNameStyle,
    checkboxStyle,
    errorStyle,
    emptyStateStyle,
    isAbove4K,
  };
};