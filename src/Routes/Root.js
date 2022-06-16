import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "../Home/Home";

export const Root = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/carrinho" element={<Carrinho />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
