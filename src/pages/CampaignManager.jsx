import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { fetchCampaigns } from "../data/fetchMetrics";
import { useThemeStyles } from "../components/ThemeStylesCM";
import { CampaignList } from "../components/CampaignList";
import { RegistrationModal } from "../components/CadastrarCampanhas";
import { EditModal } from "../components/EditarCampanhas";

const CampaignManager = ({ startDate, endDate }) => {
  const styles = useThemeStyles();
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
  const [editNewCampaignName, setEditNewCampaignName] = useState("");

  // Registered campaigns with associated raw items
  const [registeredCampaigns, setRegisteredCampaigns] = useState(() => {
    const saved = localStorage.getItem("registeredCampaigns");
    console.log("Conteúdo bruto do localStorage:", saved);
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      const validCampaigns = parsed
        .filter(campaign => 
          campaign.id && 
          campaign.name && 
          Array.isArray(campaign.items) && 
          campaign.items.every(item => item.id && item.name && item.originalName)
        )
        .map(campaign => ({
          ...campaign,
          id: campaign.id.toString(),
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

        const registered = [];
        const unregistered = [];

        data.forEach((campaign, index) => {
          const campaignName = campaign.Nome_Interno_Campanha || "";
          const campaignData = {
            id: campaign.id ? campaign.id.toString() : `api-${index}-${Date.now()}`,
            name: campaignName,
            originalName: campaignName,
            active: true,
            selected: false,
          };

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
        setRegisteredCampaigns(() => {
          const campaignMap = new Map();
          registered.forEach(campaign => {
            campaignMap.set(campaign.id, campaign);
          });
          const uniqueCampaigns = Array.from(campaignMap.values());
          console.log("Campanhas registradas únicas após deduplicação:", uniqueCampaigns);
          return uniqueCampaigns;
        });

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
      setEditingCampaign({ ...campaign });
      setShowEditModal(true);
      setEditNewCampaignName(campaign.name);
    } else {
      console.error("Campanha não encontrada para o ID:", id);
      alert("Erro: Campanha não encontrada. Tente novamente.");
    }
  };

  const handleFinishEdit = () => {
    if (!editingCampaign) return;
    const chosenName = editNewCampaignName;
    if (!chosenName) {
      alert("Por favor, digite um nome para a campanha");
      return;
    }
    setRegisteredCampaigns(registeredCampaigns.map(c =>
      c.id === editingCampaign.id ? { 
        ...c, 
        name: chosenName,
        items: c.items.map(item => ({ ...item, name: chosenName }))
      } : c
    ));
    setShowEditModal(false);
    setEditingCampaign(null);
  };

  return (
    <div
      style={{
        backgroundColor: styles.colors.background,
        padding: "20px",
        minHeight: "100vh",
        fontFamily: "'Rawline', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <h1
        style={{
          color: styles.colors.text.primary,
          textAlign: "center",
          marginBottom: "40px",
          fontSize: styles.isAbove4K ? "2.5rem" : "24px",
          fontWeight: "600",
        }}
      >
        Nomes de campanhas
      </h1>

      {error && <div style={styles.errorStyle}>{error}</div>}

      <RegistrationModal
        show={showRegistrationModal}
        onHide={() => setShowRegistrationModal(false)}
        campaigns={unregisteredCampaigns}
        selectedCampaignName={selectedCampaignName}
        setSelectedCampaignName={setSelectedCampaignName}
        newCampaignName={newCampaignName}
        setNewCampaignName={setNewCampaignName}
        useNewName={useNewName}
        setUseNewName={setUseNewName}
        onFinish={handleFinishRegistration}
        styles={styles}
        registeredCampaigns={registeredCampaigns}
      />

      <EditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        campaign={editingCampaign}
        editNewCampaignName={editNewCampaignName}
        setEditNewCampaignName={setEditNewCampaignName}
        onFinish={handleFinishEdit}
        styles={styles}
      />

      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={5} className="mb-4">
          <CampaignList
            title="Campanhas Cadastradas"
            campaigns={registeredCampaigns}
            loading={loading}
            onEdit={handleEdit}
            styles={styles}
          />
        </Col>
        <Col xs={12} md={10} lg={5}>
          <CampaignList
            title="Campanhas NÃO Cadastradas"
            campaigns={unregisteredCampaigns}
            loading={loading}
            onSelect={handleSelectUnregistered}
            onRegister={handleRegister}
            styles={styles}
            isUnregistered
          />
        </Col>
      </Row>
    </div>
  );
};

export default CampaignManager;