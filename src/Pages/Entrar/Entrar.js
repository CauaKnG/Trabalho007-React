import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formulario } from "./Style";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../Services/api";

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
  const location = useLocation();


  const [clientes, setClientes] = useState({});

  useEffect(() => {
    let carregando = false;
    const getClientes = async () => {
      const response = await api.get(`/cliente`);
      setClientes(response.data);
      // console.log(response.data);
    };
    getClientes();
  }, [location]);

  

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
    let pessoaLogada;
    clientes.forEach((pessoa) => {
      if (
        pessoa.emailCliente === data.enderecoEmail &&
        pessoa.senha === data.Senha
      ) {
        window.localStorage.setItem(
          "usuario",
          JSON.stringify(pessoa)
        );
        pessoaLogada = pessoa
        return pessoaLogada
      }
    });
    if(pessoaLogada === undefined){
      alert("Usuário não encontardo.")
      redirect("/cadastrar")
    }else{
      alert("Bem-vindo, "+ pessoaLogada.nomeCliente)

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
