import React from "react";
import { BarraCategoria } from "../../Components/BarraCategoria/BarraCategoria";
import { Carrossel } from "../../Components/Carrossel/Carrossel";
import { Destaques } from "../../Components/Destaques/Destaques";


export const Inicio = () => {
  return (
    <>
      <BarraCategoria />
      <Carrossel />
      <Destaques />
    </>
  );
};
