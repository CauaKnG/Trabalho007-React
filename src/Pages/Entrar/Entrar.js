import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formulario } from "./Style";
import { Link } from "react-router-dom";

export const Entrar = () => {
  return (
    <Formulario>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email </Form.Label>
        <Form.Control type="email" placeholder="Email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control type="password" placeholder="Senha" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Lembrar de mim" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Entrar
      </Button>
      <label className="cadastro">Não possui conta? 
      <Link to="/cadastrar">Cadastre-se aqui</Link>
      </label>
    </Form>
    </Formulario>
  );
};
