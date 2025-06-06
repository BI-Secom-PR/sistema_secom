"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { fetchCampaigns } from "../../data/fetchMetrics"
import { graficoMetrics } from "../../data/graficoMetrics"

export const useCampaignManager = (startDate, endDate) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Ref para evitar loops infinitos
  const isLoadingRef = useRef(false)
  const lastLoadParamsRef = useRef("")

  // Modal controls
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  // Registration state
  const [selectedCampaignName, setSelectedCampaignName] = useState("")
  const [newCampaignName, setNewCampaignName] = useState("")
  const [useNewName, setUseNewName] = useState(false)

  // Edit state
  const [editingCampaign, setEditingCampaign] = useState(null)
  const [editNewCampaignName, setEditNewCampaignName] = useState("")

  // Função para carregar dados do localStorage de forma segura
  const loadFromLocalStorage = useCallback((key, defaultValue = []) => {
    try {
      const saved = localStorage.getItem(key)
      if (!saved) return defaultValue

      const parsed = JSON.parse(saved)
      if (!Array.isArray(parsed)) return defaultValue

      return parsed
    } catch (err) {
      console.error(`Erro ao carregar ${key} do localStorage:`, err)
      localStorage.removeItem(key)
      return defaultValue
    }
  }, [])

  // Função para salvar no localStorage de forma segura
  const saveToLocalStorage = useCallback((key, data) => {
    try {
      const limitedData = Array.isArray(data) ? data.slice(0, 100) : data
      const jsonString = JSON.stringify(limitedData)

      if (jsonString.length > 1024 * 1024) {
        console.warn(`Dados muito grandes para ${key}, limitando...`)
        const reducedData = Array.isArray(limitedData) ? limitedData.slice(0, 50) : limitedData
        localStorage.setItem(key, JSON.stringify(reducedData))
      } else {
        localStorage.setItem(key, jsonString)
      }
    } catch (err) {
      console.error(`Erro ao salvar ${key} no localStorage:`, err)
      if (err.name === "QuotaExceededError") {
        console.warn("Quota do localStorage excedida, limpando dados antigos...")
        localStorage.removeItem(key)
      }
    }
  }, [])

  // Campaigns state
  const [registeredCampaigns, setRegisteredCampaigns] = useState(() => {
    return loadFromLocalStorage("registeredCampaigns", [])
  })

  const [unregisteredCampaigns, setUnregisteredCampaigns] = useState(() => {
    return loadFromLocalStorage("unregisteredCampaigns", [])
  })

  // Save to localStorage com debounce
  const saveTimeoutRef = useRef(null)

  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveToLocalStorage("registeredCampaigns", registeredCampaigns)
      saveToLocalStorage("unregisteredCampaigns", unregisteredCampaigns)
    }, 1000)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [registeredCampaigns, unregisteredCampaigns, saveToLocalStorage])

  // Função para verificar se campanha está ativa
  const checkCampaignActivity = useCallback(async (campaignName, startDate, endDate) => {
    try {
      const metrics = await graficoMetrics(startDate, endDate, campaignName)

      if (!metrics || !metrics.actual || !Array.isArray(metrics.actual)) {
        return false
      }

      const yesterday = new Date(endDate)
      yesterday.setDate(yesterday.getDate() - 1)
      const twoDaysAgo = new Date(endDate)
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

      const yesterdayMetric = metrics.actual.find(
        (item) => new Date(item.date).toDateString() === yesterday.toDateString(),
      )

      if (yesterdayMetric && yesterdayMetric.impressions > 0) {
        return true
      }

      const lastActiveMetric = metrics.actual
        .filter((item) => item.impressions > 0)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0]

      const isInactive = !lastActiveMetric || new Date(lastActiveMetric.date) <= twoDaysAgo
      return !isInactive
    } catch (error) {
      console.error(`❌ Erro ao verificar atividade da campanha ${campaignName}:`, error)
      return false
    }
  }, [])

  // Carregar dados da API original
  const loadCampaigns = useCallback(async () => {
    if (isLoadingRef.current) return false

    setLoading(true)
    setError(null)
    isLoadingRef.current = true

    try {
      console.log("🔄 Carregando campanhas dos últimos 7 dias...")
      const data = await fetchCampaigns(startDate, endDate)
      console.log("📊 Campanhas recebidas:", data?.length || 0)

      if (!data || data.length === 0) {
        console.log("❌ Nenhuma campanha encontrada")
        setRegisteredCampaigns([])
        setUnregisteredCampaigns([])
        return true
      }

      const registered = []
      const unregistered = []

      data.forEach((campaign, index) => {
        const campaignData = {
          id: campaign.id ? campaign.id.toString() : `api-${index}-${Date.now()}`,
          name: campaign.Nome_Interno_Campanha,
          originalName: campaign.Nome_Interno_Campanha,
          active: true,
          selected: false,
        }

        if (campaign.Nome_Interno_Campanha.includes("_")) {
          unregistered.push(campaignData)
        } else {
          registered.push({
            ...campaignData,
            items: [
              {
                id: campaign.id ? campaign.id.toString() : `item-${index}-${Date.now()}`,
                name: campaign.Nome_Interno_Campanha,
                originalName: campaign.Nome_Interno_Campanha,
              },
            ],
          })
        }
      })

      console.log("📊 Processadas:", { registered: registered.length, unregistered: unregistered.length })

      setRegisteredCampaigns(registered)
      setUnregisteredCampaigns(unregistered)

      console.log("✅ Campanhas carregadas com sucesso")
      return true
    } catch (err) {
      console.error("❌ Erro ao carregar campanhas:", err)
      setError("Erro ao carregar campanhas. Tente novamente.")
      return false
    } finally {
      setLoading(false)
      isLoadingRef.current = false
    }
  }, [startDate, endDate])

  // Carregar dados quando necessário
  useEffect(() => {
    const loadParams = `${startDate}-${endDate}`

    if (lastLoadParamsRef.current === loadParams || isLoadingRef.current) {
      return
    }

    lastLoadParamsRef.current = loadParams
    loadCampaigns()
  }, [startDate, endDate, loadCampaigns])

  // Handlers
  const handleSelectUnregistered = useCallback((id) => {
    setUnregisteredCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c)))
  }, [])

  const handleRegister = useCallback(() => {
    const selectedCampaigns = unregisteredCampaigns.filter((c) => c.selected)
    if (!selectedCampaigns.length) {
      alert("Por favor, selecione pelo menos uma campanha para cadastrar.")
      return
    }
    setShowRegistrationModal(true)
    setSelectedCampaignName("")
    setNewCampaignName("")
    setUseNewName(false)
  }, [unregisteredCampaigns])

  const handleFinishRegistration = useCallback(() => {
    const selectedCampaigns = unregisteredCampaigns.filter((c) => c.selected)
    if (!selectedCampaigns.length) return

    const campaignName = useNewName ? newCampaignName : selectedCampaignName
    if (!campaignName.trim()) {
      alert("Por favor, selecione ou digite um nome para a campanha")
      return
    }

    const formattedItems = selectedCampaigns.map((item) => ({
      id: item.id,
      name: campaignName,
      originalName: item.originalName,
    }))

    if (useNewName) {
      const maxId = Math.max(...registeredCampaigns.map((c) => Number.parseInt(c.id) || 0), 0)
      const newId = (maxId + 1).toString()

      setRegisteredCampaigns((prev) => [
        ...prev,
        {
          id: newId,
          name: campaignName,
          items: formattedItems,
          active: true,
        },
      ])
    } else {
      setRegisteredCampaigns((prev) =>
        prev.map((c) =>
          c.name === campaignName
            ? {
                ...c,
                items: [...c.items, ...formattedItems],
                active: true,
              }
            : c,
        ),
      )
    }

    setUnregisteredCampaigns((prev) => prev.filter((c) => !c.selected))
    setShowRegistrationModal(false)
    alert("Campanhas cadastradas com sucesso!")
  }, [unregisteredCampaigns, useNewName, newCampaignName, selectedCampaignName, registeredCampaigns])

  const handleEdit = useCallback(
    (id) => {
      const campaign = registeredCampaigns.find((c) => c.id === id.toString())
      if (campaign) {
        setEditingCampaign({ ...campaign })
        setShowEditModal(true)
        setEditNewCampaignName(campaign.name)
      } else {
        alert("Erro: Campanha não encontrada. Tente novamente.")
      }
    },
    [registeredCampaigns],
  )

  const handleFinishEdit = useCallback(() => {
    if (!editingCampaign || !editNewCampaignName.trim()) {
      alert("Por favor, digite um nome para a campanha")
      return
    }

    setRegisteredCampaigns((prev) =>
      prev.map((c) =>
        c.id === editingCampaign.id
          ? {
              ...c,
              name: editNewCampaignName,
              items: c.items.map((item) => ({ ...item, name: editNewCampaignName })),
            }
          : c,
      ),
    )

    setShowEditModal(false)
    setEditingCampaign(null)
    alert("Campanha atualizada com sucesso!")
  }, [editingCampaign, editNewCampaignName])

  const handleDeleteCampaign = useCallback((campaignId) => {
    if (!window.confirm("Tem certeza que deseja excluir esta campanha? Esta ação não pode ser desfeita.")) {
      return
    }

    setRegisteredCampaigns((prev) => prev.filter((c) => c.id !== campaignId))
    alert("Campanha excluída com sucesso!")
  }, [])

  // Limpar localStorage
  const clearLocalStorage = useCallback(() => {
    try {
      localStorage.removeItem("registeredCampaigns")
      localStorage.removeItem("unregisteredCampaigns")
      setRegisteredCampaigns([])
      setUnregisteredCampaigns([])
      console.log("✅ LocalStorage limpo com sucesso")
    } catch (error) {
      console.error("❌ Erro ao limpar localStorage:", error)
    }
  }, [])

  return {
    // State
    loading,
    error,
    registeredCampaigns,
    unregisteredCampaigns,

    // Modal state
    showRegistrationModal,
    setShowRegistrationModal,
    showEditModal,
    setShowEditModal,

    // Registration state
    selectedCampaignName,
    setSelectedCampaignName,
    newCampaignName,
    setNewCampaignName,
    useNewName,
    setUseNewName,

    // Edit state
    editingCampaign,
    setEditingCampaign,
    editNewCampaignName,
    setEditNewCampaignName,

    // Handlers
    handleSelectUnregistered,
    handleRegister,
    handleFinishRegistration,
    handleEdit,
    handleFinishEdit,
    handleDeleteCampaign,
    clearLocalStorage,

    // Utility
    loadCampaigns,
  }
}
