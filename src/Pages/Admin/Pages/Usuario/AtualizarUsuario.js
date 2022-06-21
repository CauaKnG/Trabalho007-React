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

export const AtualizarUsuario = () => {
  const validacaoAtualizacao = yup
    .object({
      emailCliente: yup.string().required("O campo email  é obrigatorio!"),
      telefoneCliente: yup
        .number()
        .required("O campo telefone  é obrigatorio!"),
      senha: yup.string().required("O campo senha  é obrigatorio!"),
      admin: yup.string().required("O campo admin  é obrigatorio!"),
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
      console.log(response.data);
    };
    getUsuarios();
  }, [location]);

  const onSubmitAtualizacao = (data, evn) => {
    evn.preventDefault();
   /* const atualizarUsuario = async () => {
      const response = await api
        .put(
          `/usuario/dto`,
          {
              idCliente:
                emailCliente: "vinicim22s4@gmail.com.br",
                nomeCliente: "Poze",
                cpfCliente: "226.046.070-42",
                telefoneCliente: "21845444414",
                dataNascimento:"02/12/2000",
                admin:false,
                senha:"",
                enderecoDTO: {
                    numero: "566556",
                    complemento:"Rua Teresa",
                    cep: "25675160",
                    bairro: "Bataillard",
                    cidade:"Petrópolis",
                    uf:"RJ",
                    rua:"Mosela"
                }
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(
          (response) => {
            alert("Produto atualizado com sucesso!!");
            setShow(false);
            redirect("/admin/produto/atualizar");
          },
          (error) => {
            alert("Nome ou descrição já existente");
          }
        );
    };
    atualizarProduto();*/
  };

  return (
    <>
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
                              readOnly
                              defaultValue={
                                usuarioSelecionado &&
                                usuarioSelecionado.emailCliente
                              }
                              placeholder="Email Cliente"
                            />
                            <p>{errors.emailCliente?.message}</p>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="telefoneCliente">
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
                                usuarioSelecionado &&
                                usuarioSelecionado.senha
                              }
                              {...register("senha")}
                              type="text"
                              placeholder="senha"
                            />
                            <p>{errors.senha?.message}</p>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="admin">
                            <Form.Label>Admin</Form.Label>
                            <Form.Control
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
    </>
  );
};
