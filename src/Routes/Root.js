import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Carrinho } from "../Pages/Carrinho/Carrinho";
import { Inicio } from "../Pages/Inicio/Inicio";
import { Entrar } from "../Pages/Entrar/Entrar";
import { Cadastro } from "../Pages/Cadastro/Cadastro";
import { NavBar } from "../Components/BarraNav/BarraNav";
import { Rodape } from "../Components/Rodape/Rodape";
import { Produtos } from "../Pages/Produtos/Produtos";
import { DetalheProduto } from "../Pages/DetalheProduto/DetalheProduto";
import { CarrinhoProvider } from "../Contexts/CarrinhoContext";

export const Root = () => {
  return (
    <>
      <CarrinhoProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/entrar" element={<Entrar />} />
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/produtos/:categoria" element={<Produtos />} />
            <Route
              path="/detalhe-produto/:idProduto"
              element={<DetalheProduto />}
            />
          </Routes>
          <Rodape />
        </BrowserRouter>
      </CarrinhoProvider>
    </>
  );
};
