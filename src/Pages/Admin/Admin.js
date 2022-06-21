import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./style.scss";

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
          <div className="container-admin row">
            <h1 className="titulo-admin">Usuario</h1>
            <Link
              className="card-admin col-lg-4 card-usuario"
              to="/admin/usuario/atualizar"
            >
              <div class="imagem-card"></div>
              <Card>
                <Card.Body>
                  <Card.Title>Atualizar</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </div>
          <div className="container-admin row">
            <h2 className="titulo-admin">Categoria</h2>
            <Link
              className="card-admin col-lg-4 card-categoria"
              to="/admin/categoria/atualizar"
            >
              <div class="imagem-card"></div>
              <Card>
                <Card.Body>
                  <Card.Title>Atualizar</Card.Title>
                </Card.Body>
              </Card>
            </Link>
            <Link
              className="card-admin col-lg-4 card-categoria"
              to="/admin/categoria/criar"
            >
              <div class="imagem-card"></div>
              <Card>
                <Card.Body>
                  <Card.Title>Criar</Card.Title>
                </Card.Body>
              </Card>
            </Link>
            <Link
              className="card-admin col-lg-4 card-categoria"
              to="/admin/categoria/deletar"
            >
              <div class="imagem-card"></div>
              <Card>
                <Card.Body>
                  <Card.Title>Deletar</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </div>
          <div className="container-admin row">
            <h3 className="titulo-admin">Produto</h3>
            <Link
              className="card-admin col-lg-4 card-produto"
              to="/admin/produto/atualizar"
            >
              <div class="imagem-card"></div>
              <Card>
                <Card.Body>
                  <Card.Title>Atualizar</Card.Title>
                </Card.Body>
              </Card>
            </Link>
            <Link
              className="card-admin col-lg-4 card-produto"
              to="/admin/produto/criar"
            >
              <div class="imagem-card"></div>
              <Card>
                <Card.Body>
                  <Card.Title>Criar</Card.Title>
                </Card.Body>
              </Card>
            </Link>
            <Link
              className="card-admin col-lg-4 card-produto"
              to="/admin/produto/deletar"
            >
              <div class="imagem-card"></div>
              <Card>
                <Card.Body>
                  <Card.Title>Deletar</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </div>
        </Container>
      )}
    </>
  );
};
