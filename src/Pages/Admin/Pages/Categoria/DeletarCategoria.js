import React, { useEffect, useState } from "react";
import { api } from "../../../../Services/api";
import { useLocation } from "react-router-dom";
import { Formulario } from "../../../Entrar/Style";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

export const DeleteCategoria = () => {
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

//   const removerCategoria = (idCategoria, evento) => {
//     evento.preventDefault();
//     console.log(idCategoria);
//     const remover  () => {
//       const response = await api.delete(`/categoria/${idCategoria}`).then(
//         (response) => {
//           alert("Categoria deletada com sucesso!!");
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     };
//     remover();
//   };
    const removerCategoria = (idCategoria, evn) => {
        evn.preventDefault();
    api.delete(`/categoria/${idCategoria}`).then(
                (response) => {
                  alert("Categoria deletada com sucesso!!");
                },
                (error) => {
                  console.log(error);
                }
              );
 };


  return (
    <>
      <Formulario>
        <div>
          <p></p>
        </div>
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
                <Form onSubmit={removerCategoria(categoria.idCategoria)}>
                  <button type="submit">
                    Remover
                  </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Formulario>
    </>
  );
};
