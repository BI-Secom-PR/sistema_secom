import { FaInstagram, FaFacebook, FaPinterest, FaLinkedin, FaGoogle } from "react-icons/fa"; // Ícones

export const data = [
    {
      id: 1,
      platform: "Instagram",
      icon: <FaInstagram style={{ color: "#E1306C" }} />,
      investment: "R$258.800,00",
      metrics: { CPM: "R$1,53", CPV: "R$0,08", CPC: "R$3,01", CTR: "0,43%", VTR: "6,04%" },
      progress: 70, // Valor para o progresso (0 a 100)
    },
    {
      id: 2,
      platform: "Facebook",
      icon: <FaFacebook style={{ color: "#4267B2" }} />,
      investment: "R$342.112,00",
      metrics: { CPM: "R$1,88", CPV: "R$0,10", CPC: "R$2,53", CTR: "0,42%", VTR: "6,10%" },
      progress: 90,
    },
    {
      id: 3,
      platform: "Pinterest",
      icon: <FaPinterest style={{ color: "#E60023" }} />,
      investment: "R$112.570,00",
      metrics: { CPM: "R$1,41", CPV: "R$0,05", CPC: "R$2,58", CTR: "0,44%", VTR: "5,89%" },
      progress: 50,
    },
    {
      id: 4,
      platform: "LinkedIn",
      icon: <FaLinkedin style={{ color: "#0077B5" }} />,
      investment: "R$51.332,00",
      metrics: { CPM: "R$1,23", CPV: "R$0,07", CPC: "R$2,44", CTR: "0,53%", VTR: "6,01%" },
      progress: 30,
    },
    {
      id: 5,
      platform: "Google",
      icon: <FaGoogle style={{ color: "#DB4437" }} />,
      investment: "R$351.332,00",
      metrics: { CPM: "R$1,78", CPV: "R$0,05", CPC: "R$2,37", CTR: "0,48%", VTR: "6,04%" },
      progress: 80,
    },
  ];