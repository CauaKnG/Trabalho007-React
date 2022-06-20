import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Style.scss";
import { BarraCategoria } from "../BarraCategoria/BarraCategoria";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useCarrinho } from "../../Contexts/CarrinhoContext";

export const NavBar = () => {
  const carrinho = useCarrinho();
  const location = useLocation();
  const [lupaAberta, setLupaAberta] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(false);

  function toogleLupa() {
    setLupaAberta(!lupaAberta);
  }

  const contadorTotalCarrinho = Object.keys(carrinho.carrinho).reduce(
    (prev, curr) => {
      return prev + carrinho.carrinho[curr].quantidade;
    },
    0
  );

  useEffect(() => {
    const usuario = window.localStorage.getItem("usuario");
    if (usuario) {
      setUsuarioLogado(true);
    } else {
      setUsuarioLogado(false);
    }
  }, [location]);

  const deslogar = () => {
    window.localStorage.removeItem("usuario");
  };
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container className="container-nav">
          <Navbar.Brand href="/">7 Passos</Navbar.Brand>
          <Form className="d-none col-lg-6 d-lg-flex">
            <Form.Group className="w-100" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Buscar.." />
            </Form.Group>
            <Button variant="primary" type="submit">
              Pesquisar
            </Button>
          </Form>
          <div className="d-lg-none lupa">
            <button onClick={toogleLupa}>Lupa</button>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {usuarioLogado === false && (
                <Nav.Link href="/entrar">Entrar</Nav.Link>
              )}
              {usuarioLogado === true && (
                <Nav.Link onClick={deslogar} href="/">
                  Sair
                </Nav.Link>
              )}
              <Nav.Link href="/carrinho">
                Carrinho{" "}
                {contadorTotalCarrinho > 0 && (
                  <span>({contadorTotalCarrinho})</span>
                )}
              </Nav.Link>

              <NavDropdown
                title="Categorias"
                className="d-lg-none"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/produtos/esporte">
                  Esporte
                </NavDropdown.Item>
                <NavDropdown.Item href="/produtos/casual">
                  Casual
                </NavDropdown.Item>
                <NavDropdown.Item href="/produtos/sandalia">
                  Sandália
                </NavDropdown.Item>
                <NavDropdown.Item href="/produtos/bota">Bota</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <BarraCategoria className="d-none d-lg-flex" />
      {lupaAberta && (
        <div className="pesquisa-mobile">
          <Container>
            <Form className="col-lg-12 d-flex d-lg-none">
              <Form.Group className="w-100" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Buscar.." />
              </Form.Group>
              <Button variant="primary" type="submit">
                Pesquisar
              </Button>
            </Form>
          </Container>
        </div>
      )}
    </>
  );
};
