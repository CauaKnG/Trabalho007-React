import React, { useEffect, useState } from "react";
import { api } from "../../../../Services/api";
import { useLocation , useNavigate } from "react-router-dom";
import { Formulario } from "../../../Entrar/Style";
import Table from "react-bootstrap/Table";
import { Modal, Button } from "react-bootstrap";

export const DeleteProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const location = useLocation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  var redirect = useNavigate();

  useEffect(() => {
    const getProdutos = async () => {
      const response = await api.get(`/produto`);
      setProdutos(response.data);
      console.log(response.data);
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
    <>
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
                  <Button variant="primary" onClick={handleShow}>
                    Excluir 
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Deletar produto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Deseja realmente excluir o produto {produto.nomeProduto} ?
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
                          removerProduto(produto.idProduto, e)
                        }
                        variant="primary"
                      >
                        Deletar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Formulario>
    </>
  );
};
