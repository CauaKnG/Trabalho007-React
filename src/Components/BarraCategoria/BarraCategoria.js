import React from "react";
import "./Style.scss"
import { Link } from "react-router-dom";

export const BarraCategoria = () => {
  
    return (
      <div className="categorias d-none d-lg-flex">
      <Link to="/produtos/esporte">Esporte</Link>
      <Link to="/produtos/casual">Casual</Link>
      <Link to="/produtos/sandalia">Sandália</Link>
      <Link to="/produtos/bota">Bota</Link>
      </div>
    )
  } 