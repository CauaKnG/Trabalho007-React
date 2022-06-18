import React from "react";
import { Formulario } from "../Entrar/Style";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const Cadastro = () => {
  return (
    <Formulario>
      <Form>
        <div className="row">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome completo</Form.Label>
            <Form.Control type="text" placeholder="Seu nome" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Data de nascimento</Form.Label>
            <Form.Control type="text" placeholder="00/00/0000" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>CPF</Form.Label>
            <Form.Control type="text" placeholder="000.000.000-00" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Celular</Form.Label>
            <Form.Control type="text" placeholder="(00)00000-0000" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>CEP</Form.Label>
            <Form.Control type="text" placeholder="00000-000" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Número</Form.Label>
            <Form.Control type="text" placeholder="00" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Rua</Form.Label>
            <Form.Control type="text" placeholder="Rua xxxx" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Complemento</Form.Label>
            <Form.Control type="text" placeholder="bar do fulano" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Cidade</Form.Label>
            <Form.Control type="text" placeholder="Magé" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>UF</Form.Label>
            <Form.Control type="text" placeholder="RJ" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Senha" />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
            <Form.Label>Confirme sua senha</Form.Label>
            <Form.Control type="password" placeholder="Senha" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Aceito os termos." />
          </Form.Group>
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
          <label className="cadastro">
            Já possui conta?
            <Link to="/entrar">Faça seu login</Link>
          </label>
        </div>
      </Form>
    </Formulario>
  );
};
