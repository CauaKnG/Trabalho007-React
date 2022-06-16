import React from "react";
import { useNavigate } from "react-router-dom";
import { Titulo, Header, Lista, Cabecalho, Individual,
BarraPesquisa, InputPesquisa, BotaoPesquisa } from "./Style";

export const NavBar = () => {

  var navigate = useNavigate();
  function handleClickInicio() {
    navigate("/")
  }
  function handleClickEntrar() {
    navigate("/entrar")
  }
  function handleClickCarrinho() {
    navigate("/carrinho")
  }

  return (
    <Cabecalho>
      <Header>
        <Titulo onClick={handleClickInicio}>7 Passos</Titulo>
        <BarraPesquisa>
          <InputPesquisa type="text" placeholder="Digite..." />
          <BotaoPesquisa>Pesquisar</BotaoPesquisa>
        </BarraPesquisa>
        <Lista>
          <Individual onClick={handleClickEntrar}>Entrar</Individual>
          <Individual onClick={handleClickCarrinho}>Carrinho</Individual>
        </Lista>
      </Header>
    </Cabecalho>
  )
}