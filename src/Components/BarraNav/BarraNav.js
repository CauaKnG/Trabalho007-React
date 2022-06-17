import React from "react";
import { useNavigate } from "react-router-dom";
import { Titulo, Header, Lista, Cabecalho, Individual } from "./Style";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Style.scss";

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
      <Header className="col-md-12">
        <Titulo onClick={handleClickInicio}>7 Passos</Titulo>
        
        <Form className="d-flex col-md-6">
      <Form.Group className="formulario-container" controlId="formBasicEmail">
      <FloatingLabel
        controlId="floatingInput"
        label="Digite"
      >
        <Form.Control type="text" placeholder="Enter email" />
      </FloatingLabel>
      </Form.Group>
      <Button variant="primary" type="submit">
        Pesquisar
      </Button>
    </Form>
        
        <Lista>
          <Individual onClick={handleClickEntrar}>Entrar</Individual>
          <Individual onClick={handleClickCarrinho}>Carrinho</Individual>
        </Lista>
      </Header>
    </Cabecalho>
  )
}