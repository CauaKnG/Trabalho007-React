import React, { useEffect, useState } from "react";
import { Formulario } from "../Entrar/Style";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../Services/api";
import * as yup from "yup";

const validacao = yup
  .object({
    nome: yup.string().required("O campo Nome é obrigatorio!"),
    nascimento: yup
      .string()
      .required("O campo Data de nascimento é obrigatorio!"),
    cpf: yup.string().required("O campo CPF é obrigatorio!"),
    celular: yup.string().required("O campo Celular é obrigatorio!"),
    emailCadastro: yup.string().required("O campo Email é obrigatorio!"),
    cep: yup.string().required("O campo Cep é obrigatorio!"),
    numero: yup.string().required("O campo Número é obrigatorio!"),
    rua: yup.string().required("O campo Rua é obrigatorio!"),
    complemento: yup.string().required("O campo Complemento é obrigatorio!"),
    cidade: yup.string().required("O campo Cidade é obrigatorio!"),
    uf: yup.string().required("O campo UF é obrigatorio!"),
    senha: yup.string().required("O campo Senha é obrigatorio!"),
    bairro: yup.string().required("O campo Bairro é obrigatorio!"),
    aceite: yup.boolean("").oneOf([true], "message"),
  })
  .required();

export const Cadastro = () => {
  var redirect = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacao),
  });

  // let { nome, setNome } = useState();

  const onSubmit = (data, evn) => {
    evn.preventDefault();
      const criarCliente = async () => {
        const dadosEnviados = await api
          .post(
            `/cliente/dto`,
            {
              emailCliente: data.emailCadastro,
              nomeCliente: data.nome,
              cpfCliente: data.cpf,
              telefoneCliente: data.celular,
              dataNascimento: data.nascimento,
              senha: data.senha,
              enderecoDTO: {
                numero: data.numero,
                complemento: data.complemento,
                cep: data.cep,
                bairro: data.bairro,
                cidade: data.cidade,
                uf: data.uf,
                rua: data.rua,
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(
            (resposta) => {
              alert("Cliente cadastrado com sucesso!!")
              redirect("/entrar")
            },
            (error) => {
              console.log(error);
            }
          );
      };
      criarCliente();
  };

    function handleChangeInputData(event) {
      // console.log(event.target.value);
    }

  function handleChangeInputCep(e) {
    // var value = e.target.value
    e.currentTarget.maxLength = 8;
    // return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
  }

  /*function handleChangeInputCPF(event) {
    console.log(event.target.value);
  }

  function handleChangeInputTelefone(event) {
    console.log(event.target.value);
  }*/

  return (
    <Formulario>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <Form.Group className="mb-3" controlId="nomeCadastro">
            <Form.Label>Nome completo</Form.Label>
            <Form.Control
              {...register("nome")}
              type="text"
              placeholder="Seu nome"
            />
            <p>{errors.nome?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="dataNascimento">
            <Form.Label>Data de nascimento</Form.Label>
            <Form.Control
              {...register("nascimento")}
              type="text"
              onChange={handleChangeInputData}
              placeholder="00/00/0000"
            />
            <p>{errors.nascimento?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="cpfCliente">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              {...register("cpf")}
              type="text"
              placeholder="000.000.000-00"
            />
            <p>{errors.cpf?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="celularCliente">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              {...register("celular")}
              type="text"
              placeholder="(00)00000-0000"
            />
            <p>{errors.celular?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="emailCliente">
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...register("emailCadastro")}
              type="email"
              placeholder="Email"
            />
            <p>{errors.emailCadastro?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="cepCliente">
            <Form.Label>CEP</Form.Label>
            <Form.Control
              {...register("cep")}
              type="text"
              placeholder="00000000"
            />
            <p>{errors.cep?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="numeroCliente">
            <Form.Label>Número</Form.Label>
            <Form.Control
              {...register("numero")}
              type="text"
              placeholder="00"
            />
            <p>{errors.numero?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="ruaCliente">
            <Form.Label>Rua</Form.Label>
            <Form.Control
              {...register("rua")}
              type="text"
              placeholder="Rua xxxx"
            />
            <p>{errors.rua?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="complementoCliente">
            <Form.Label>Complemento</Form.Label>
            <Form.Control
              {...register("complemento")}
              type="text"
              placeholder="bar do fulano"
            />
            <p>{errors.complemento?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-5" controlId="bairroCliente">
            <Form.Label>Bairro</Form.Label>
            <Form.Control
              {...register("bairro")}
              type="text"
              placeholder="Magé"
            />
            <p>{errors.bairro?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-5" controlId="cidadeCliente">
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              {...register("cidade")}
              type="text"
              placeholder="Magé"
            />
            <p>{errors.cidade?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-2" controlId="UFCliente">
            <Form.Label>UF</Form.Label>
            <Form.Control
              {...register("uf")}
              type="text"
              placeholder="RJ"
            />
            <p>{errors.uf?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6" controlId="senhaCliente">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              {...register("senha")}
              type="password"
              placeholder="Senha"
            />
            <p>{errors.senha?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="aceite">
            <Form.Check
              {...register("aceite")}
              type="checkbox"
              label="Aceito os termos."
            />
            <p>{errors.aceite?.message}</p>
          </Form.Group>
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
          <label className="cadastro">
            Já possui conta?
            <Link to="/entrar">Faça seu login</Link>
          </label>
        </div>
      </Form>
    </Formulario>
  );
};
