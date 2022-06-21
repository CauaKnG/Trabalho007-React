import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const Admin = () => {
  const location = useLocation();
  const [adminLogado, setAdminLogado] = useState(false);
  var redirect = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(window.localStorage.getItem("usuario"));
    if (usuario && usuario.admin === true) {
      setAdminLogado(true);
    } else {
      setAdminLogado(false);
      redirect("/");
    }
  }, [location]);

  return (
    <>
      {adminLogado === true && (
        <Container>
          <div >
          <Link to="/admin/usuario/atualizar">Atualizar</Link>
          </div>
          <div>
            <Link to="/admin/categoria/atualizar">Atualizar</Link>
            <Link to="/admin/categoria/criar">Criar</Link>
            <Link to="/admin/categoria/deletar">Deletar</Link>
          </div>
          <div>
            <Link to="/admin/produto/atualizar">Atualizar</Link>
            <Link to="/admin/produto/criar">Criar</Link>
            <Link to="/admin/produto/deletar">Deletar</Link>
          </div>
        </Container>
      )}
    </>
  );
};
