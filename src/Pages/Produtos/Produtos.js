import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { api } from "../../Services/api";
import { useLocation, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import "./Style.scss";
import Container from "react-bootstrap/Container";
import {FormatarNumero} from "../../Utils/FormatarNumero";

export const Produtos = () => {
  const location = useLocation();

  let { categoria } = useParams();
  categoria = categoria.normalize("NFD");
  categoria = categoria[0].toUpperCase() + categoria.substring(1);
  const [listaProdutos, setListaProdutos] = useState();

  useEffect(() => {
    let carregando = false;
    const getProdutosByCategoria = async () => {
      const response = await api.get(
        `/categoria/produto/dto/nome/${categoria}`
      );
      setListaProdutos(response.data.produtoList);
      // console.log(response.data.produtoList);
    };
    getProdutosByCategoria();
  }, [location]);

  return (
    <>
      {/* <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> */}
      {listaProdutos !== undefined && (
        <Container>
        <div className="container-produto row">
          {listaProdutos.map((produto, index) => (
            <Card className="col-lg-auto" key={index}>
              <Card.Img className="imagem-card"
                variant="top"
                src={produto.imagemProduto.toString()}
                alt={produto.descricaoProduto}
              />
              <Card.Body>
                <Card.Title>{produto.nomeProduto}</Card.Title>
                <Card.Text className="descricao">{produto.descricaoProduto}</Card.Text>
                <Card.Text>{FormatarNumero(produto.valorUnitario)}</Card.Text>
                <Link className="botao-card-produto" to={`/detalhe-produto/${produto.idProduto}`}>
                  Detalhes
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
        </Container>
      )}
    </>
  );
};
