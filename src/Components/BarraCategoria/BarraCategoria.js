import React from "react";
import "./Style.scss"
import { Link } from "react-router-dom";

export const BarraCategoria = () => {
  
    return (
      <div className="categorias d-none d-lg-flex">
      <Link to="/produtos/Esporte">Esporte</Link>
      <Link to="/produtos/Casual">Casual</Link>
      <Link to="/produtos/Sandália">Sandália</Link>
      <Link to="/produtos/Bota">Bota</Link>
      </div>
    )
  } 