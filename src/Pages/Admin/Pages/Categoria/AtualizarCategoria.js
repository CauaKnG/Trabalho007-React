import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../../../Services/api";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formulario } from "../../../Entrar/Style";

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
  const location = useLocation();

  useEffect(() => {
    const getCategorias = async () => {
      const response = await api.get(`/categoria`);
      setCategorias(response.data);
      console.log(response.data);
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
          },
          (error) => {
            alert("Categoria já existente");
          }
        );
    };
    atualizarCategoria();
  };

  return (
    <>
      <Formulario>
        <Form onSubmit={handleSubmit(onSubmitAtualizacao)}>
        <Form.Group className="mb-3" controlId="idCategoria">
            <Form.Label>ID Categoria</Form.Label>
            <Form.Control
              {...register("idCategoria")}
              type="text"
              readOnly=""
              placeholder="ID Categoria"
            />
            <p>{errors.nomeCategoria?.message}</p>
          </Form.Group>
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
    </>
  );
};
