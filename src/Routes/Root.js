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
import { Admin } from "../Pages/Admin/Admin";
import { AtualizarCategoria } from "../Pages/Admin/Pages/Categoria/AtualizarCategoria";
import { CriarCategoria } from "../Pages/Admin/Pages/Categoria/CriarCategoria";
import { DeleteCategoria } from "../Pages/Admin/Pages/Categoria/DeletarCategoria";
import { CriarProduto } from "../Pages/Admin/Pages/Produto/CriarProduto";
import { AtualizarProduto } from "../Pages/Admin/Pages/Produto/AtualizarProduto";
import { DeleteProduto } from "../Pages/Admin/Pages/Produto/DeleteProduto";
import { AtualizarUsuario } from "../Pages/Admin/Pages/Usuario/AtualizarUsuario";

export const Root = () => {
  return (
    <>
      <CarrinhoProvider>
        <BrowserRouter>
          <NavBar />
          <div className="conteudo-site">
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
              <Route path="/admin" element={<Admin />} />

              <Route
                path="/admin/categoria/atualizar"
                element={<AtualizarCategoria />}
              />
              <Route
                path="/admin/categoria/criar"
                element={<CriarCategoria />}
              />
              <Route
                path="/admin/categoria/deletar"
                element={<DeleteCategoria />}
              />
              <Route
                path="/admin/produto/atualizar"
                element={<AtualizarProduto />}
              />
              <Route path="/admin/produto/criar" element={<CriarProduto />} />
              <Route
                path="/admin/produto/deletar"
                element={<DeleteProduto />}
              />
              <Route
                path="/admin/usuario/atualizar"
                element={<AtualizarUsuario />}
              />
            </Routes>
          </div>
          <Rodape />
        </BrowserRouter>
      </CarrinhoProvider>
    </>
  );
};
