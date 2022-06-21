import React, { useEffect, useState } from "react";
import "./Style.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { api } from "../../Services/api";

export const BarraCategoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [novaLista, setNovaLista] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getProdutos = async () => {
      const response = await api.get(`/categoria`);
      setCategorias(response.data);
    };
    
    //setCategorias(response.data);
    getProdutos();
  }, [location]);

  return (
    <div className="categorias d-none d-lg-flex">
      {categorias.map((categoria, index) => (
        <Link
          key={index}
          to={`/produtos/${categoria.nomeCategoria.toLowerCase()}`}
        >
          {categoria.nomeCategoria}
        </Link>
      ))}
    </div>
  );
};
