import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../../../Services/api";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formulario } from "../../../Entrar/Style";
import Container from "react-bootstrap/Container";

export const CriarCategoria = () => {
  const validacaoCriacao = yup
    .object({
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
    resolver: yupResolver(validacaoCriacao),
  });

  const [categorias, setCategorias] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getCategorias = async () => {
      const response = await api.get(`/categoria`);
      setCategorias(response.data);
    };
    getCategorias();
  }, [location]);

  const removeCategoria = async (idCategoria) => {
    const response = await api.delete(`/categoria/${idCategoria}`).then(
      (response) => {
        alert("Categoria deletada com sucesso!!");
      },
      (error) => {
        console.log(error);
      }
    );
    setCategorias(response.data);
  };

  const onSubmitCriacao = (data, evn) => {
    evn.preventDefault();
    const novaCategoria = async () => {
      const response = await api
        .post(
          `/categoria/dto`,
          {
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
            alert("Categoria criada com sucesso!!");
          },
          (error) => {
            alert("Categoria já existente");
          }
        );
    };
    novaCategoria();
  };

  return (
    <Container>
      <Formulario>
        <Form onSubmit={handleSubmit(onSubmitCriacao)}>
          <Form.Group className="mb-3" controlId="nomeCategoria">
            <Form.Label>Nome Categoria</Form.Label>
            <Form.Control
              {...register("nomeCategoria")}
              type="text"
              placeholder="Nome Categoria"
            />
            <p>{errors.nomeCategoria?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="descricaoCategoria">
            <Form.Label>Descrição Categoria</Form.Label>
            <Form.Control
              {...register("descricaoCategoria")}
              type="text"
              placeholder="Descrição Categoria"
            />
            <p>{errors.descricaoCategoria?.message}</p>
          </Form.Group>
          <Button variant="primary" type="submit">
            Criar
          </Button>
        </Form>
      </Formulario>
    </Container>
  );
};
