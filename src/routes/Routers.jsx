import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from '../routes/PrivateRoute'


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
          <Route path="/" element={<PrivateRoute />} >
            <Route path="/" element={<Menu_direcionamento />} />
          </Route>
          <Route path="/home" element={<PrivateRoute />} >
            <Route path="/home" element={<Menu_direcionamento />} />
          </Route>
          <Route path="/campanhas_ativas" element={<PrivateRoute />} >
            <Route path="/campanhas_ativas" element={<Campanhas_ativas />} />
          </Route>
          <Route path="/trends" element={<PrivateRoute />} >
            <Route path="/trends" element={<Trends />} />
          </Route>
          <Route path="/powerbi" element={<PrivateRoute />} >
            <Route path="/powerbi" element={<Powerbi />} />
          </Route>
          <Route path="/demandas" element={<PrivateRoute />} >
            <Route path="/demandas" element={<Demandas />} />
          </Route>
         
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

        </Routes>
    </>
  );
};

export default Routers;