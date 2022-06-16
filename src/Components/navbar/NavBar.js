import React from "react";
import { useNavigate } from "react-router-dom";
import { Titulo, Header, Lista, Cabecalho, Individual,
BarraPesquisa, InputPesquisa, BotaoPesquisa } from "./Style";

export const NavBar = () => {

  var navigate = useNavigate();
  function handleClickHome() {
    navigate("/")
  }
  function handleClickLogin() {
    navigate("/login")
  }
  function handleClickCarrinho() {
    navigate("/carrinho")
  }

  return (
    <Cabecalho>
      <Header>
        <Titulo onClick={handleClickHome}>7 Passos</Titulo>
        <BarraPesquisa>
          <InputPesquisa type="text" placeholder="Digite..." />
          <BotaoPesquisa>Pesquisar</BotaoPesquisa>
        </BarraPesquisa>
        <Lista>
          <Individual onClick={handleClickLogin}>Login</Individual>
          <Individual onClick={handleClickCarrinho}>Carrinho</Individual>
        </Lista>

      </Header>
    </Cabecalho>
  )
}