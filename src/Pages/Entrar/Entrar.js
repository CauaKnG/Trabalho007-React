import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formulario } from "./Style";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validacao = yup
  .object({
    enderecoEmail: yup
      .string()
      .email("Digite um email válido!")
      .required("O email é obrigatorio!"),
    Senha: yup.string().required("Campo obrigatorio!"),
    // Lembrar:yup.boolean("").oneOf([true],"message"),
  })
  .required();

export const Entrar = () => {
  window.localStorage.setItem(
    "usuarios",
    JSON.stringify([
      {
        nome: "Rebeca",
        email: "rebeca@teste.com",
        senha: "123",
        isAdmin: true,
      },
      {
        nome: "Gabriel",
        email: "gabriel@teste.com",
        senha: "123",
        isAdmin: false,
      },
    ])
  );

  var redirect = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacao),
  });

  const onSubmit = (data, evn) => {
    evn.preventDefault();
    const pessoas = JSON.parse(window.localStorage.getItem("usuarios"));
    let pessoaLogada;
    pessoas.forEach((pessoa) => {
      if (
        pessoa.email === data.enderecoEmail &&
        pessoa.senha === data.Senha
      ) {
        pessoaLogada = pessoa
        return pessoaLogada
      }
    });
    if(pessoaLogada === undefined){
      redirect("/cadastrar")
    }else{
      redirect("/")
    }
  };


  return (
    <Formulario>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="emailLogin">
          <Form.Label>Email </Form.Label>
          <Form.Control
            {...register("enderecoEmail")}
            type="email"
            placeholder="Email"
          />
          <p>{errors.enderecoEmail?.message}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="senhaLogin">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            {...register("Senha")}
            type="password"
            placeholder="Senha"
          />
          <p>{errors.Senha?.message}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="lembrarLogin">
          <Form.Check
            {...register("Lembrar")}
            type="checkbox"
            label="Lembrar de mim"
          />
          <p>{errors.Lembrar?.message}</p>
        </Form.Group>
        <Button variant="primary" type="submit">
          Entrar
        </Button>
        <label className="cadastro">
          Não possui conta?
          <Link to="/cadastrar">Cadastre-se aqui</Link>
        </label>
      </Form>
    </Formulario>
  );
};
