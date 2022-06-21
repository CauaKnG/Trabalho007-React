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

export const AtualizarUsuario = () => {
  const validacaoAtualizacao = yup
    .object({
      emailCliente: yup.string().required("O campo email  é obrigatorio!"),
      telefoneCliente: yup
        .number()
        .required("O campo telefone  é obrigatorio!"),
      senha: yup.string().required("O campo senha  é obrigatorio!"),
      admin: yup.string().required("O campo admin  é obrigatorio!"),
      novaSenha: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacaoAtualizacao),
  });

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState();
  const location = useLocation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (usuario) => {
    setUsuarioSelecionado(usuario);
    setShow(true);
  };

  var redirect = useNavigate();

  useEffect(() => {
    const getUsuarios = async () => {
      const response = await api.get(`/cliente`);
      setUsuarios(response.data);
    };
    getUsuarios();
  }, [location]);

  const onSubmitAtualizacao = (data, evn) => {
    evn.preventDefault();
    const atualizarUsuario = async () => {
      const response = await api
        .put(
          `/cliente/dto`,
          {
            idCliente: usuarioSelecionado.idCliente,
            emailCliente: data.emailCliente,
            nomeCliente: usuarioSelecionado.nomeCliente,
            cpfCliente: usuarioSelecionado.cpfCliente,
            telefoneCliente: data.telefoneCliente,
            dataNascimento: usuarioSelecionado.dataNascimento,
            admin: data.admin,
            senha: data.senha,
            enderecoDTO: {
              numero: usuarioSelecionado.endereco.numero,
              complemento: usuarioSelecionado.endereco.complemento,
              cep: usuarioSelecionado.endereco.cep,
              bairro: usuarioSelecionado.endereco.bairro,
              cidade: usuarioSelecionado.endereco.localidade,
              uf: usuarioSelecionado.endereco.uf,
              rua: usuarioSelecionado.endereco.logradouro,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(
          (response) => {
            alert("Cliente atualizado com sucesso!!");
            setShow(false);
            redirect("/admin/usuario/atualizar");
          },
          (error) => {
            alert("Erro ao atualizar usuário, tente novamente mais tarde");
          }
        );
    };
    atualizarUsuario();
  };

  return (
    <Container>
      <Formulario>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Admin?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.idCliente}</td>
                <td>{usuario.nomeUsuario}</td>
                <td>{usuario.emailCliente}</td>
                <td>{usuario.admin}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={(e) => handleShow(usuario)}
                  >
                    Editar
                  </Button>

                  <Modal centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Atualizar usuario !</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Formulario>
                        <Form onSubmit={handleSubmit(onSubmitAtualizacao)}>
                          <Form.Group className="mb-3" controlId="emailCliente">
                            <Form.Label>Email </Form.Label>
                            <Form.Control
                              {...register("emailCliente")}
                              type="text"
                              defaultValue={
                                usuarioSelecionado &&
                                usuarioSelecionado.emailCliente
                              }
                              placeholder="Email Cliente"
                            />
                            <p>{errors.emailCliente?.message}</p>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="telefoneCliente"
                          >
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                              defaultValue={
                                usuarioSelecionado &&
                                usuarioSelecionado.telefoneCliente
                              }
                              {...register("telefoneCliente")}
                              type="text"
                              placeholder="Telefone Cliente"
                            />
                            <p>{errors.telefoneCliente?.message}</p>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="descricaoProduto"
                          >
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                              defaultValue={
                                usuarioSelecionado && usuarioSelecionado.senha
                              }
                              {...register("senha")}
                              type="password"
                              placeholder="****"
                            />
                            <p>{errors.senha?.message}</p>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="novaSenha">
                            <Form.Label>Nova senha</Form.Label>
                            <Form.Control
                              {...register("novaSenha")}
                              type="password"
                              placeholder="****"
                            />
                            <p>{errors.novaSenha?.message}</p>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="admin">
                            <Form.Label>Admin</Form.Label>
                            <Form.Control
                              defaultValue={
                                usuarioSelecionado &&
                                usuarioSelecionado.admin === true
                                  ? "true"
                                  : "false"
                              }
                              {...register("admin")}
                              type="text"
                              placeholder="admin"
                            />
                            <p>{errors.admin?.message}</p>
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
