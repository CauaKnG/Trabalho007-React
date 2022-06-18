import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Style.scss";

export const Rodape = () => {
  return (
    <footer>
      <Navbar bg="primary" variant="dark">
        <Container>
          <p>Residência em TIC Software 2022.1 - Turma:01</p>
          <p>Todos os direitos reservados &copy; | Grupo7</p>
        </Container>
      </Navbar>
    </footer>
  );
};
