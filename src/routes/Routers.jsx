import React from "react";
import { Route, Routes } from "react-router-dom";

//pages

import Campanhas_ativas from "../pages/Campanhas_ativas";
import Menu_direcionamento from "../pages/menu_direcionamento";
import Trends from "../pages/Trends";
import Powerbi from "../pages/Powerbi";
import Demandas from "../pages/Demandas";
import Login from "../pages/login";
import Cadastro from "../pages/Cadastro";

const Routers = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Menu_direcionamento />} />
            <Route path="/home" element={<Menu_direcionamento />} />
            <Route path="/campanhas_ativas" element={<Campanhas_ativas />} /> 
            <Route path="/trends" element={<Trends />} /> 
            <Route path="/powerbi" element={<Powerbi />} />
            <Route path="/demandas" element={<Demandas />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
    </>
  );
};

export default Routers;