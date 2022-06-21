import React, { useEffect, useState } from "react";
import { api } from "../../../../Services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Formulario } from "../../../Entrar/Style";
import Table from "react-bootstrap/Table";
import { Modal, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";

export const DeleteProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState();
  const location = useLocation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (produto) => {
    setShow(true);
    setProdutoSelecionado(produto);
  };

  var redirect = useNavigate();

  useEffect(() => {
    const getProdutos = async () => {
      const response = await api.get(`/produto`);
      setProdutos(response.data);
    };
    getProdutos();
  }, [location]);

  const removerProduto = (idProduto, evento) => {
    evento.preventDefault();

    const remover = async () => {
      const response = await api.delete(`/produto/${idProduto}`).then(
        (response) => {
          setShow(false);
          redirect("/admin/produto/deletar");
        },
        (error) => {
          console.log(error);
        }
      );
    };
    remover();
  };

  return (
    <Container>
      <Formulario>
        <div>
          <p></p>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome Categoria</th>
              <th>Descrição Categoria</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto, index) => (
              <tr key={index}>
                <td>{produto.idProduto}</td>
                <td>{produto.nomeProduto}</td>
                <td>{produto.descricaoProduto}</td>
                <td>
                  <Button variant="primary" onClick={() => handleShow(produto)}>
                    Excluir
                  </Button>
                  {produtoSelecionado !== undefined && (
                    <Modal centered show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Deletar produto</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Deseja realmente excluir o produto{" "}
                        {produtoSelecionado.descricaoProduto} ?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          id="cancelar"
                          variant="secondary"
                          onClick={handleClose}
                        >
                          Cancelar
                        </Button>
                        <Button
                          id="remover"
                          onClick={(e) =>
                            removerProduto(produtoSelecionado.idProduto, e)
                          }
                          variant="primary"
                        >
                          Deletar
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Formulario>
    </Container>
  );
};
