import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../../../Services/api";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Formulario } from "../../../Entrar/Style";
import Table from "react-bootstrap/Table";
import { Modal, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";

export const AtualizarCategoria = () => {
  const validacaoAtualizacao = yup
    .object({
      idCategoria: yup.number().required("O campo id é obrigatorio!"),
      nomeCategoria: yup.string().required("O campo nome é obrigatorio!"),
      descricaoCategoria: yup
        .string()
        .required("O campo descrição é obrigatorio!"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacaoAtualizacao),
  });

  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState();
  const location = useLocation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (categoria) => {
    setCategoriaSelecionada(categoria);
    setShow(true);
  };

  var redirect = useNavigate();

  useEffect(() => {
    const getCategorias = async () => {
      const response = await api.get(`/categoria`);
      setCategorias(response.data);
    };
    getCategorias();
  }, [location]);

  const onSubmitAtualizacao = (data, evn) => {
    evn.preventDefault();
    const atualizarCategoria = async () => {
      const response = await api
        .put(
          `/categoria/dto`,
          {
            idCategoria: data.idCategoria,
            nomeCategoria: data.nomeCategoria,
            descricaoCategoria: data.descricaoCategoria,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(
          (response) => {
            alert("Categoria atualizada com sucesso!!");
            setShow(false);
            redirect("/admin/categoria/atualizar");
          },
          (error) => {
            alert("Nome ou descrição já existente");
          }
        );
    };
    atualizarCategoria();
  };

  return (
    <Container>
      <Formulario>
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
                  <Button
                    variant="primary"
                    onClick={(e) => handleShow(categoria)}
                  >
                    Editar
                  </Button>

                  <Modal centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Atualizar categoria !</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Formulario>
                        <Form onSubmit={handleSubmit(onSubmitAtualizacao)}>
                          <Form.Group className="mb-3" controlId="idCategoria">
                            <Form.Label>ID Categoria</Form.Label>
                            <Form.Control
                              {...register("idCategoria")}
                              type="text"
                              readOnly
                              defaultValue={
                                categoriaSelecionada &&
                                categoriaSelecionada.idCategoria
                              }
                              placeholder="ID Categoria"
                            />
                            <p>{errors.nomeCategoria?.message}</p>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="nomeCategoria"
                          >
                            <Form.Label>Nome Categoria</Form.Label>
                            <Form.Control
                              defaultValue={
                                categoriaSelecionada &&
                                categoriaSelecionada.nomeCategoria
                              }
                              {...register("nomeCategoria")}
                              type="text"
                              placeholder="Nome Categoria"
                            />
                            <p>{errors.nomeCategoria?.message}</p>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="descricaoCategoria"
                          >
                            <Form.Label>Descrição Categoria</Form.Label>
                            <Form.Control
                              defaultValue={
                                categoriaSelecionada &&
                                categoriaSelecionada.descricaoCategoria
                              }
                              {...register("descricaoCategoria")}
                              type="text"
                              placeholder="Descrição Categoria"
                            />
                            <p>{errors.descricaoCategoria?.message}</p>
                          </Form.Group>
                          <Button variant="primary" type="submit">
                            Atualizar
                          </Button>
                        </Form>
                      </Formulario>
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Formulario>
    </Container>
  );
};
