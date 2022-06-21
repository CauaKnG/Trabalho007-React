import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
          <DropdownButton
            variant="outline-secondary"
            title="Categoria"
            id="input-group-dropdown-1"
          >
            <Dropdown.Item href="#"><Link to="/admin/categoria/atualizar">Atualizar</Link></Dropdown.Item>
            <Dropdown.Item href="#"><Link to="/admin/categoria/criar">Criar</Link></Dropdown.Item>
            <Dropdown.Item href="#"><Link to="/admin/categoria/deletar">Deletar</Link></Dropdown.Item>
          </DropdownButton>
        </Container>
      )}
    </>
  );
};
