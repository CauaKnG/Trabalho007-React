import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { api } from "../../Services/api";
import { useLocation, Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner  from "react-bootstrap/Spinner";

export const Produtos = () => {
  const location = useLocation();

  let { categoria } = useParams();
  categoria = categoria.normalize("NFD");
  categoria = categoria[0].toUpperCase() + categoria.substring(1);
  const [listaProdutos, setListaProdutos] = useState();

  useEffect(() => {
    let carregando = false
    const getProdutosByCategoria = async () => {
      const response = await api.get(
        `/categoria/produto/dto/nome/${categoria}`
      );
      setListaProdutos(response.data.produtoList);
    };
    getProdutosByCategoria();
  }, [location]);

  return (
    <>
      {/* <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> */}
      {listaProdutos !== undefined && (
        <div>
          {listaProdutos.map((produto, index) => (
            <Card key={index}>
              <Card.Img
                variant="top"
                src={produto.imagemProduto.toString()}
                alt={produto.descricaoProduto}
              />
              <Card.Body>
                <Card.Title>{produto.nomeProduto}</Card.Title>
                <Card.Text>{produto.descricaoProduto}</Card.Text>
                <Card.Text>R$ {produto.valorUnitario}</Card.Text>
                <Link to ={`/detalhe-produto/${produto.idProduto}`}>Comprar</Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};
