"use client"

import { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { useTheme } from "../context/ThemeContext"
import { format, subDays } from "date-fns"

// Components
import CampaignCard from "../components/campaign-manager/CampaignCard"
import RegisteredCampaignItem from "../components/campaign-manager/RegisteredCampaignItem"
import UnregisteredCampaignItem from "../components/campaign-manager/UnregisteredCampaignItem"
import RegistrationModal from "../components/campaign-manager/RegistrationModal"
import EditModal from "../components/campaign-manager/EditModal"

// Hooks and utilities
import { useCampaignManager } from "../components/campaign-manager/useCampaignManager"
import {
  getCampaignManagerColors,
  getCampaignManagerStyles,
} from "../components/campaign-manager/CampaignManagerStyles"

const CampaignManager = () => {
  const { isDarkMode } = useTheme()
  const [isAbove4K, setIsAbove4K] = useState(false)

  // Date state
  const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd")
  const [startDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"))
  const [endDate] = useState(yesterday)

  // Custom hook for campaign management
  const {
    loading,
    error,
    registeredCampaigns,
    unregisteredCampaigns,
    showRegistrationModal,
    setShowRegistrationModal,
    showEditModal,
    setShowEditModal,
    selectedCampaignName,
    setSelectedCampaignName,
    newCampaignName,
    setNewCampaignName,
    useNewName,
    setUseNewName,
    editingCampaign,
    editNewCampaignName,
    setEditNewCampaignName,
    handleSelectUnregistered,
    handleRegister,
    handleFinishRegistration,
    handleEdit,
    handleFinishEdit,
  } = useCampaignManager(startDate, endDate)

  // Check resolution > 4K
  useEffect(() => {
    const checkResolution = () => {
      setIsAbove4K(window.innerWidth > 3840 || window.innerHeight > 2160)
    }
    checkResolution()
    window.addEventListener("resize", checkResolution)
    return () => window.removeEventListener("resize", checkResolution)
  }, [])

  // Get theme-based colors and styles
  const colors = getCampaignManagerColors(isDarkMode)
  const styles = getCampaignManagerStyles(colors, isAbove4K)

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nomes de campanhas</h1>

      {/* Edit Modal */}
      <EditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        colors={colors}
        isAbove4K={isAbove4K}
        editingCampaign={editingCampaign}
        editNewCampaignName={editNewCampaignName}
        setEditNewCampaignName={setEditNewCampaignName}
        onFinishEdit={handleFinishEdit}
      />

      {/* Registration Modal */}
      <RegistrationModal
        show={showRegistrationModal}
        onHide={() => setShowRegistrationModal(false)}
        colors={colors}
        isAbove4K={isAbove4K}
        unregisteredCampaigns={unregisteredCampaigns}
        registeredCampaigns={registeredCampaigns}
        useNewName={useNewName}
        setUseNewName={setUseNewName}
        selectedCampaignName={selectedCampaignName}
        setSelectedCampaignName={setSelectedCampaignName}
        newCampaignName={newCampaignName}
        setNewCampaignName={setNewCampaignName}
        onFinishRegistration={handleFinishRegistration}
      />

      {/* Main layout */}
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={5} className="mb-4">
          <CampaignCard
            title="Campanhas Cadastradas"
            campaigns={registeredCampaigns}
            loading={loading}
            error={error}
            colors={colors}
            styles={styles}
            isAbove4K={isAbove4K}
          >
            {registeredCampaigns.map((campaign) => (
              <RegisteredCampaignItem
                key={campaign.id}
                campaign={campaign}
                colors={colors}
                styles={styles}
                isAbove4K={isAbove4K}
                onEdit={handleEdit}
              />
            ))}
          </CampaignCard>
        </Col>

        <Col xs={12} md={10} lg={5}>
          <CampaignCard
            title="Campanhas NÃO Cadastradas"
            campaigns={unregisteredCampaigns}
            loading={loading}
            error={error}
            colors={colors}
            styles={styles}
            isAbove4K={isAbove4K}
          >
            <>
              {unregisteredCampaigns.map((campaign) => (
                <UnregisteredCampaignItem
                  key={campaign.id}
                  campaign={campaign}
                  colors={colors}
                  styles={styles}
                  isAbove4K={isAbove4K}
                  onSelect={handleSelectUnregistered}
                />
              ))}
              <button style={styles.registerButtonStyle} onClick={handleRegister}>
                Cadastrar
              </button>
            </>
          </CampaignCard>
        </Col>
      </Row>
    </div>
  )
}

export default CampaignManager
