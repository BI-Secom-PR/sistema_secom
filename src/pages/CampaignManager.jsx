import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { fetchCampaigns } from "../data/fetchMetrics";

const CampaignManager = ({ startDate, endDate }) => {
  const { isDarkMode } = useTheme();
  const [isAbove4K, setIsAbove4K] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal controls for registration and editing
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // State for registration
  const [selectedCampaignName, setSelectedCampaignName] = useState("");
  const [newCampaignName, setNewCampaignName] = useState("");
  const [useNewName, setUseNewName] = useState(false);

  // State for editing
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editAction, setEditAction] = useState("associateExisting");
  const [editSelectedCampaignName, setEditSelectedCampaignName] = useState("");
  const [editNewCampaignName, setEditNewCampaignName] = useState("");
  const [itemsToDisassociate, setItemsToDisassociate] = useState([]);

  // Registered campaigns with associated raw items
  const [registeredCampaigns, setRegisteredCampaigns] = useState(() => {
    const saved = localStorage.getItem("registeredCampaigns");
    console.log("Conteúdo bruto do localStorage:", saved);
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      // Validar estrutura e garantir IDs únicos
      const validCampaigns = parsed
        .filter(campaign => 
          campaign.id && 
          campaign.name && 
          Array.isArray(campaign.items) && 
          campaign.items.every(item => item.id && item.name && item.originalName)
        )
        .map(campaign => ({
          ...campaign,
          id: campaign.id.toString(), // Garantir que o ID seja string
        }));
      console.log("Campanhas válidas carregadas do localStorage:", validCampaigns);
      return validCampaigns;
    } catch (err) {
      console.error("Erro ao carregar registeredCampaigns do localStorage:", err);
      return [];
    }
  });

  // Unregistered campaigns
  const [unregisteredCampaigns, setUnregisteredCampaigns] = useState(() => {
    const saved = localStorage.getItem("unregisteredCampaigns");
    console.log("Conteúdo bruto do localStorage (unregistered):", saved);
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      // Validar estrutura
      const validCampaigns = parsed
        .filter(campaign => 
          campaign.id && 
          campaign.name && 
          campaign.originalName
        )
        .map(campaign => ({
          ...campaign,
          id: campaign.id.toString(),
          selected: false,
        }));
      console.log("Campanhas não cadastradas válidas carregadas do localStorage:", validCampaigns);
      return validCampaigns;
    } catch (err) {
      console.error("Erro ao carregar unregisteredCampaigns do localStorage:", err);
      return [];
    }
  });

  // Salva registeredCampaigns e unregisteredCampaigns no localStorage
  useEffect(() => {
    console.log("Salvando registeredCampaigns no localStorage:", registeredCampaigns);
    localStorage.setItem("registeredCampaigns", JSON.stringify(registeredCampaigns));
    console.log("Salvando unregisteredCampaigns no localStorage:", unregisteredCampaigns);
    localStorage.setItem("unregisteredCampaigns", JSON.stringify(unregisteredCampaigns));
  }, [registeredCampaigns, unregisteredCampaigns]);

  // Busca campanhas da API e separa em registradas e não registradas
  useEffect(() => {
    const loadCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCampaigns(startDate, endDate);
        console.log("Campanhas retornadas pela API:", data);

        // Separar campanhas com base na presença de "_" ou "|" no nome
        const registered = [];
        const unregistered = [];

        data.forEach((campaign, index) => {
          // Garantir que Nome_Interno_Campanha é uma string
          const campaignName = campaign.Nome_Interno_Campanha || "";
          
          // Criar objeto base para a campanha com ID único
          const campaignData = {
            id: campaign.id ? campaign.id.toString() : `api-${index}-${Date.now()}`, // Garantir ID único
            name: campaignName,
            originalName: campaignName,
            active: true,
            selected: false,
          };

          // Verificar se o nome da campanha contém "_" ou "|"
          if (campaignName.includes("_") || campaignName.includes("|")) {
            unregistered.push(campaignData);
          } else {
            registered.push({
              ...campaignData,
              items: [{
                id: campaign.id ? campaign.id.toString() : `item-${index}-${Date.now()}`,
                name: campaignName,
                originalName: campaignName,
              }],
            });
          }
        });

        console.log("Campanhas registradas formatadas:", registered);
        console.log("Campanhas não registradas formatadas:", unregistered);
        // Substituir registeredCampaigns, mantendo apenas campanhas únicas por ID
        setRegisteredCampaigns(() => {
          const campaignMap = new Map();
          registered.forEach(campaign => {
            campaignMap.set(campaign.id, campaign);
          });
          const uniqueCampaigns = Array.from(campaignMap.values());
          console.log("Campanhas registradas únicas após deduplicação:", uniqueCampaigns);
          return uniqueCampaigns;
        });

        // Substituir unregisteredCampaigns, mantendo apenas campanhas únicas por ID
        setUnregisteredCampaigns(() => {
          const campaignMap = new Map();
          unregistered.forEach(campaign => {
            campaignMap.set(campaign.id, campaign);
          });
          const uniqueCampaigns = Array.from(campaignMap.values());
          console.log("Campanhas não registradas únicas após deduplicação:", uniqueCampaigns);
          return uniqueCampaigns;
        });
      } catch (err) {
        setError("Erro ao carregar campanhas. Tente novamente.");
        console.error("Erro ao carregar campanhas:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCampaigns();
  }, [startDate, endDate]);

  // Check resolution > 4K
  useEffect(() => {
    const checkResolution = () => {
      setIsAbove4K(window.innerWidth > 3840 || window.innerHeight > 2160);
    };
    checkResolution();
    window.addEventListener("resize", checkResolution);
    return () => window.removeEventListener("resize", checkResolution);
  }, []);

  // Theme-based colors
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

  // Styles
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

  // Registration handlers
  const handleSelectUnregistered = (id) => {
    setUnregisteredCampaigns(unregisteredCampaigns.map(c => 
      c.id === id ? { ...c, selected: !c.selected } : c
    ));
  };

  const handleRegister = () => {
    if (!unregisteredCampaigns.some(c => c.selected)) {
      alert("Por favor, selecione pelo menos uma campanha para cadastrar.");
      return;
    }
    setShowRegistrationModal(true);
    setSelectedCampaignName("");
    setNewCampaignName("");
    setUseNewName(false);
  };

  const handleFinishRegistration = () => {
    const selected = unregisteredCampaigns.filter(c => c.selected);
    if (!selected.length) return;
    const campaignName = useNewName ? newCampaignName : selectedCampaignName;
    if (!campaignName) {
      alert("Por favor, selecione ou digite um nome para a campanha");
      return;
    }
    const formattedItems = selected.map(item => ({
      id: item.id,
      name: campaignName,
      originalName: item.originalName,
    }));
    console.log("Itens formatados para registro:", formattedItems);
    if (useNewName) {
      const maxId = Math.max(...registeredCampaigns.map(c => parseInt(c.id) || 0), 0);
      const newId = (maxId + 1).toString();
      setRegisteredCampaigns([...registeredCampaigns, { 
        id: newId, 
        name: campaignName, 
        items: formattedItems, 
        active: true 
      }]);
    } else {
      setRegisteredCampaigns(registeredCampaigns.map(c =>
        c.name === campaignName ? { 
          ...c, 
          items: [...c.items, ...formattedItems], 
          active: true 
        } : c
      ));
    }
    setUnregisteredCampaigns(unregisteredCampaigns.filter(c => !c.selected));
    setShowRegistrationModal(false);
  };

  // Edit handlers
  const handleEdit = (id) => {
    const campaign = registeredCampaigns.find(c => c.id === id.toString());
    if (campaign) {
      console.log("Campanha selecionada para edição:", campaign);
      setEditingCampaign({ ...campaign }); // Cria uma cópia para evitar mutação
      setShowEditModal(true);
      setEditAction("associateExisting");
      setEditSelectedCampaignName(campaign.name);
      setEditNewCampaignName("");
      setItemsToDisassociate([]);
    } else {
      console.error("Campanha não encontrada para o ID:", id);
      alert("Erro: Campanha não encontrada. Tente novamente.");
    }
  };
  const handleSelectItemToDisassociate = (itemId) => {
    setItemsToDisassociate(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };
  const handleFinishEdit = () => {
    if (!editingCampaign) return;
    if (editAction === "disassociate") {
      if (itemsToDisassociate.length === 0) {
        alert("Por favor, selecione pelo menos um item para desassociar");
        return;
      }
      const itemsToMove = editingCampaign.items.filter(item => itemsToDisassociate.includes(item.id));
      console.log("Itens a serem desassociados:", itemsToMove);
      setUnregisteredCampaigns([
        ...unregisteredCampaigns,
        ...itemsToMove.map(item => ({ 
          id: item.id, 
          name: item.originalName, 
          originalName: item.originalName, 
          selected: false 
        }))
      ]);
      const updatedItems = editingCampaign.items.filter(item => !itemsToDisassociate.includes(item.id));
      if (updatedItems.length === 0) {
        setRegisteredCampaigns(registeredCampaigns.filter(c => c.id !== editingCampaign.id));
      } else {
        setRegisteredCampaigns(registeredCampaigns.map(c =>
          c.id === editingCampaign.id ? { ...c, items: updatedItems } : c
        ));
      }
    } else {
      const chosenName = editNewCampaignName || editSelectedCampaignName;
      if (!chosenName) {
        alert("Por favor, selecione ou digite um nome para a campanha");
        return;
      }
      setRegisteredCampaigns(registeredCampaigns.map(c =>
        c.id === editingCampaign.id ? { 
          ...c, 
          name: chosenName,
          items: c.items.map(item => ({ ...item, name: chosenName }))
        } : c
      ));
    }
    setShowEditModal(false);
    setEditingCampaign(null);
    setItemsToDisassociate([]);
  };

  return (
    <div
      style={{
        backgroundColor: colors.background,
        padding: "20px",
        minHeight: "100vh",
        fontFamily: "'Rawline', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <h1
        style={{
          color: colors.text.primary,
          textAlign: "center",
          marginBottom: "40px",
          fontSize: isAbove4K ? "2.5rem" : "24px",
          fontWeight: "600",
        }}
      >
        Nomes de campanhas
      </h1>

      {error && <div style={errorStyle}>{error}</div>}

      {/* Edit Modal */}
      <Modal 
        show={showEditModal} 
        onHide={() => setShowEditModal(false)} 
        centered 
        backdrop="static" 
        size="lg"
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: colors.card.bg,
            borderBottom: `1px solid ${colors.card.border}`,
            padding: "16px",
          }}
        >
          <Modal.Title style={{ color: colors.text.primary, fontSize: "16px", fontWeight: "normal" }}>
            Editar Campanha
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body 
          style={{ 
            backgroundColor: colors.card.bg, 
            padding: "16px",
          }}
        >
          <div>
            {editingCampaign && editingCampaign.items && editingCampaign.items.length > 0 ? (
              editingCampaign.items.map((item, index) => (
                <div 
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: `1px solid ${colors.card.border}`,
                  }}
                >
                  <div 
                    style={{ 
                      width: "10px", 
                      height: "10px", 
                      borderRadius: "50%", 
                      backgroundColor: colors.indicator.active,
                      marginRight: "12px",
                    }}
                  />
                  <span style={{ color: colors.text.primary }}>
                    {item.originalName}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ color: colors.text.secondary, textAlign: "center", padding: "20px" }}>
                Nenhum item associado a esta campanha.
              </div>
            )}
            
            <div style={{ marginTop: "24px", marginBottom: "24px" }}>
              <div style={{ color: colors.text.secondary, fontSize: "12px", marginBottom: "8px", textTransform: "uppercase" }}>
                NOME DA CAMPANHA:
              </div>
              <input
                type="text"
                value={editNewCampaignName}
                onChange={e => setEditNewCampaignName(e.target.value)}
                placeholder="Digite o novo nome da campanha"
                style={{
                  backgroundColor: isDarkMode ? "#3a3a3a" : colors.card.bg,
                  padding: "12px",
                  color: colors.text.primary,
                  borderRadius: "8px",
                  fontSize: "14px",
                  width: "100%",
                  border: `1px solid ${colors.card.border}`,
                  outline: "none",
                }}
              />
            </div>
          </div>
        </Modal.Body>
        
        <Modal.Footer style={{ 
          backgroundColor: colors.card.bg, 
          borderTop: `1px solid ${colors.card.border}`,
          padding: "16px",
          display: "flex",
          justifyContent: "center",
        }}>
          <Button 
            onClick={handleFinishEdit}
            disabled={!editNewCampaignName?.trim()}
            style={{
              backgroundColor: colors.button.bg,
              border: "none",
              borderRadius: "30px",
              padding: "8px 0",
              fontSize: "16px",
              width: "180px",
              color: colors.button.text,
              opacity: !editNewCampaignName?.trim() ? "0.7" : "1",
              cursor: !editNewCampaignName?.trim() ? "not-allowed" : "pointer",
            }}
          >
            Editar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Registration Modal */}
      <Modal show={showRegistrationModal} onHide={() => setShowRegistrationModal(false)} centered backdrop="static" size="lg">
        <Modal.Header closeButton style={{ backgroundColor: colors.card.bg, borderBottom: `1px solid ${colors.card.border}` }}>
          <Modal.Title style={{ color: colors.text.primary }}>Cadastrar Campanhas</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: colors.card.bg, padding: "20px" }}>
          <Form>
            <div style={{ marginBottom: "30px" }}>
              <h5 style={{ color: colors.text.primary }}>Campanhas selecionadas para cadastro:</h5>
              <div style={{ backgroundColor: isDarkMode ? "#1a1a1a" : colors.background, padding: "15px", borderRadius: "8px", marginTop: "10px" }}>
                {unregisteredCampaigns.filter(c => c.selected).map(c => (
                  <div key={c.id} style={{ padding: "10px", marginBottom: "5px", backgroundColor: isDarkMode ? "#3a3a3a" : "#e9ecef", borderRadius: "6px" }}>
                    <span style={statusIndicatorStyle(true)}></span>
                    <span style={{ color: colors.text.primary }}>{c.name}</span>
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
                  onChange={e => setSelectedCampaignName(e.target.value)}
                  style={{
                    backgroundColor: isDarkMode ? "#3a3a3a" : colors.card.bg,
                    color: colors.text.primary,
                    border: `1px solid ${colors.card.border}`,
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
              style={{ marginBottom: "15px", color: colors.text.primary }}
            />
            {useNewName && (
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Digite aqui o novo nome para a campanha"
                  value={newCampaignName}
                  onChange={e => setNewCampaignName(e.target.value)}
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
            onClick={() => setShowRegistrationModal(false)}
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
            onClick={handleFinishRegistration}
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

      {/* Main layout */}
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={5} className="mb-4">
          <Card style={cardStyle}>
            <div style={cardHeaderStyle}>Campanhas Cadastradas</div>
            <Card.Body style={cardBodyStyle}>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                  <Spinner animation="border" style={{ color: colors.button.bg }} />
                </div>
              ) : registeredCampaigns.length === 0 ? (
                <div style={emptyStateStyle}>
                  <p>Nenhuma campanha cadastrada.</p>
                </div>
              ) : (
                registeredCampaigns.map(c => (
                  <div key={c.id} style={listItemStyle}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={statusIndicatorStyle(c.active)}></span>
                      <span style={campaignNameStyle}>{c.name}</span>
                    </div>
                    <Button size="sm" style={editButtonStyle} onClick={() => handleEdit(c.id)}>
                      Editar
                    </Button>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={10} lg={5}>
          <Card style={cardStyle}>
            <div style={cardHeaderStyle}>Campanhas NÃO Cadastradas</div>
            <Card.Body style={cardBodyStyle}>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                  <Spinner animation="border" style={{ color: colors.button.bg }} />
                </div>
              ) : unregisteredCampaigns.length === 0 ? (
                <div style={emptyStateStyle}>
                  <p>Nenhuma campanha não cadastrada disponível.</p>
                </div>
              ) : (
                <>
                  {unregisteredCampaigns.map(c => (
                    <div key={c.id} style={listItemStyle}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Form.Check
                          type="checkbox"
                          checked={c.selected}
                          onChange={() => handleSelectUnregistered(c.id)}
                          style={{ marginRight: "10px", ...checkboxStyle }}
                        />
                        <span style={statusIndicatorStyle(c.active)}></span>
                        <span style={campaignNameStyle}>{c.name}</span>
                      </div>
                    </div>
                  ))}
                  <Button style={registerButtonStyle} onClick={handleRegister}>
                    Cadastrar
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CampaignManager;