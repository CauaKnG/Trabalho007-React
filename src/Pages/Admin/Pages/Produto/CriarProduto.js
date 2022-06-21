import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../../../Services/api";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formulario } from "../../../Entrar/Style";
import Container from "react-bootstrap/Container";

export const CriarProduto = () => {
  var redirect = useNavigate();
  const validacaoProduto = yup
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
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacaoProduto),
  });

  const [produtos, setProdutos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getProdutos = async () => {
      const response = await api.get(`/produto`);
      setProdutos(response.data);
    };
    getProdutos();
  }, [location]);

  const onSubmitCriacao = (data, evn) => {
    evn.preventDefault();

    const novoProduto = async () => {
      const response = await api
        .post(
          `/produto/dto`,
          {
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
            alert("Produto criado com sucesso !!");
            redirect("/admin/produto/criar");
          },
          (error) => {
            alert("Produto já existente");
          }
        );
    };
    novoProduto();
  };

  return (
    <Container>
      <Formulario>
        <Form onSubmit={handleSubmit(onSubmitCriacao)}>
          <Form.Group className="mb-3" controlId="nomeProduto">
            <Form.Label>Nome Produto</Form.Label>
            <Form.Control
              {...register("nomeProduto")}
              type="text"
              placeholder="Nome Produto"
            />
            <p>{errors.nomeProduto?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="descricaoProduto">
            <Form.Label>Descrição Produto</Form.Label>
            <Form.Control
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
          <Form.Group className="mb-3" controlId="valorUnitario">
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

          <Form.Group className="mb-3" controlId="imagemProduto">
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
            Criar
          </Button>
        </Form>
      </Formulario>
    </Container>
  );
};
