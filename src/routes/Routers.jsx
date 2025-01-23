import React from "react";
import { Route, Routes } from "react-router-dom";

//pages

import Home from "../pages/home";
import Plataformas from "../pages/plataformas";

const Routers = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/plataformas" element={<Plataformas />} /> 
        </Routes>
    </>
  );
};

export default Routers;