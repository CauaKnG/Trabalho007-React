import React, { useEffect, useState } from "react";
import { api } from "../../../../Services/api";
import { useLocation , useNavigate } from "react-router-dom";
import { Formulario } from "../../../Entrar/Style";
import Table from "react-bootstrap/Table";
import { Modal, Button } from "react-bootstrap";

export const DeleteCategoria = () => {
  const [categorias, setCategorias] = useState([]);
  const location = useLocation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  var redirect = useNavigate();

  useEffect(() => {
    const getCategorias = async () => {
      const response = await api.get(`/categoria`);
      setCategorias(response.data);
      console.log(response.data);
    };
    getCategorias();
  }, [location]);

  

  const removerCategoria = (idCategoria, evento) => {
    evento.preventDefault();
    console.log(idCategoria);
    const remover = async () => {
      const response = await api.delete(`/categoria/${idCategoria}`).then(
        (response) => {
          setShow(false);
          redirect("/admin/categoria/deletar");
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
            {categorias.map((categoria, index) => (
              <tr key={index}>
                <td>{categoria.idCategoria}</td>
                <td>{categoria.nomeCategoria}</td>
                <td>{categoria.descricaoCategoria}</td>
                <td>
                  <Button variant="primary" onClick={handleShow}>
                    Excluir 
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Deletar categoria</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Deseja realmente excluir a categoria {categoria.nomeCategoria} ?
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
                          removerCategoria(categoria.idCategoria, e)
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
