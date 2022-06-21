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

export const AtualizarProduto = () => {
  const validacaoAtualizacao = yup
    .object({
      nomeProduto: yup.string().required("O campo nome é obrigatorio!"),
      descricaoProduto: yup
        .string()
        .required("O campo descrição é obrigatorio!"),
      qtdEstoque: yup.number().required("O campo quantidade é obrigatorio!"),
      valorUnitario: yup
        .number()
        .required("O campo valor unitário é obrigatorio!"),
      imagemProduto: yup
        .string()
        .required("O campo imagem produto é obrigatorio!"),
      idCategoria: yup.number().required("O campo id categoria é obrigatorio!"),
      idProduto: yup.number().required("O campo id produto é obrigatorio!"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacaoAtualizacao),
  });

  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState();
  const location = useLocation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (produto) => {
    setProdutoSelecionado(produto);
    setShow(true);
  };

  var redirect = useNavigate();

  useEffect(() => {
    const getProdutos = async () => {
      const response = await api.get(`/produto`);
      setProdutos(response.data);
    };
    getProdutos();
  }, [location]);

  const onSubmitAtualizacao = (data, evn) => {
    evn.preventDefault();
    const atualizarProduto = async () => {
      const response = await api
        .put(
          `/produto/dto`,
          {
            idProduto: data.idProduto,
            nomeProduto: data.nomeProduto,
            descricaoProduto: data.descricaoProduto,
            qtdEstoque: data.qtdEstoque,
            
            valorUnitario: data.valorUnitario,
            imagemProduto: data.imagemProduto,
            categoriaDTO: {
              idCategoria: data.idCategoria,
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
            alert("Produto atualizado com sucesso!!");
            setShow(false);
            redirect("/admin/produto/atualizar");
          },
          (error) => {
            alert("Nome ou descrição já existente");
          }
        );
    };
    atualizarProduto();
  };

  return (
    <Container>
      <Formulario>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome Produto</th>
              <th>Descrição Produto</th>
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
                  <Button
                    variant="primary"
                    onClick={(e) => handleShow(produto)}
                  >
                    Editar
                  </Button>

                  <Modal centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Atualizar produto !</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Formulario>
                        <Form onSubmit={handleSubmit(onSubmitAtualizacao)}>
                          <Form.Group className="mb-3" controlId="idProduto">
                            <Form.Label>ID Produto</Form.Label>
                            <Form.Control
                              {...register("idProduto")}
                              type="text"
                              readOnly
                              defaultValue={
                                produtoSelecionado &&
                                produtoSelecionado.idProduto
                              }
                              placeholder="ID Produto"
                            />
                            <p>{errors.nomeProduto?.message}</p>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="nomeProduto">
                            <Form.Label>Nome Produto</Form.Label>
                            <Form.Control
                              defaultValue={
                                produtoSelecionado &&
                                produtoSelecionado.nomeCategoria
                              }
                              {...register("nomeProduto")}
                              type="text"
                              placeholder="Nome Produto"
                            />
                            <p>{errors.nomeProduto?.message}</p>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="descricaoProduto"
                          >
                            <Form.Label>Descrição Produto</Form.Label>
                            <Form.Control
                              defaultValue={
                                produtoSelecionado &&
                                produtoSelecionado.descricaoProduto
                              }
                              {...register("descricaoProduto")}
                              type="text"
                              placeholder="Descrição Produto"
                            />
                            <p>{errors.descricaoProduto?.message}</p>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="qtdEstoque">
                            <Form.Label>Quantidade Estoque</Form.Label>
                            <Form.Control
                              {...register("qtdEstoque")}
                              type="number"
                              placeholder="Quantidade"
                            />
                            <p>{errors.qtdEstoque?.message}</p>
                          </Form.Group>
                      
                          <Form.Group
                            className="mb-3"
                            controlId="valorUnitario"
                          >
                            <Form.Label>Valor Unitário</Form.Label>
                            <Form.Control
                              min="0.00"
                              max="10000.00"
                              step="0.01"
                              {...register("valorUnitario")}
                              type="number"
                              placeholder="Valor Unitario"
                            />
                            <p>{errors.valorUnitario?.message}</p>
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="imagemProduto"
                          >
                            <Form.Label>Imagem Produto</Form.Label>
                            <Form.Control
                              {...register("imagemProduto")}
                              type="url"
                              placeholder="Imagem Produto"
                            />
                            <p>{errors.imagemProduto?.message}</p>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="idCategoria">
                            <Form.Label>id Categoria</Form.Label>
                            <Form.Control
                              {...register("idCategoria")}
                              type="number"
                              placeholder="id Categoria"
                            />
                            <p>{errors.idCategoria?.message}</p>
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
