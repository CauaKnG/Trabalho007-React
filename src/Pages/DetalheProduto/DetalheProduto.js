import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Services/api";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "react-bootstrap/Card";
import { useLocation, Link } from "react-router-dom";
import { useCarrinho } from "../../Contexts/CarrinhoContext";
import "./Style.scss";
import { FormatarNumero } from "../../Utils/FormatarNumero";

export const DetalheProduto = () => {
  const location = useLocation();

  let { idProduto } = useParams();

  const [produto, setProduto] = useState();
  const [produtosRelacionados, setProdutosRelacionados] = useState();

  let categoria;
  const carrinho = useCarrinho();
  const add = (produto) => ()=> {
    carrinho.addCarrinho(produto);
    alert("Produto adicionado ao carrinho.")
  };

  useEffect(() => {
    let carregando = false;
    const getProdutoById = async () => {
      const responseProdutos = await api.get(`/produto/dto/${idProduto}`);
      setProduto(responseProdutos.data);
      var nomeCategoria = responseProdutos.data.categoriaDTO.nomeCategoria;
      const getProdutosRelacionados = async () => {
        categoria = nomeCategoria.normalize("NFD");
        categoria = categoria[0].toUpperCase() + categoria.substring(1);
        const response = await api.get(
          `/categoria/produto/dto/nome/${categoria}`
        );
        setProdutosRelacionados(response.data.produtoList);
        // console.log(response.data.produtoList);
      };
      getProdutosRelacionados();
    };
    getProdutoById();
  }, [location]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Container>
      {produto !== undefined && (
        <>
          <div className="row">
            <div className="col-lg-7 ">
              <img className="imagem-detalhe"
                src={produto.imagemProduto.toString()}
                alt={produto.descricaoProduto}
              />
            </div>
            <div className="col-lg-5">
              <div className="descricao-detalhe">
                <h1>{produto.descricaoProduto}</h1>
                <span>
                  Vendido e entregue por <label>Grupo 7</label>
                </span>
                <Form.Select className="w-50 mt-3 mb-3">
                  <option value=" ">Selecione o tamanho</option>
                  <option value="34">34</option>
                  <option value="35">35</option>
                  <option value="36">36</option>
                  <option value="37">37</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  <option value="41">41</option>
                </Form.Select>
                <p>Quantidade: {produto.qtdEstoque}</p>

                <h3 className="preco-de">
                  <span>De: </span>{FormatarNumero(produto.valorUnitario + 100)}
                </h3>
                <h3 className="preco-por">
                  <span>Por: </span>{FormatarNumero(produto.valorUnitario)}
                </h3>
                <label className="parcelamento">
                  <span className="negrito">3x </span>
                  <span>de </span>
                  <span className="blue negrito">{FormatarNumero(produto.valorUnitario / 3)}</span> sem juros no
                  cartão
                </label>
                <button className="botao-card-detalhe d-block" onClick={add(produto)}>Comprar</button>
              </div>
            </div>
          </div>
          {produtosRelacionados !== undefined && (
            <><h1 className="titulo-secao">Produtos similares<span className="linha" ></span></h1>
            <Carousel responsive={responsive}>
              {produtosRelacionados.map((produto, index) => (
                <div className="card-produto">
                <Card className="card-produto-detalhe" key={index}>
                  <Card.Img className="img-detalhe"
                    variant="top"
                    src={produto.imagemProduto.toString()}
                    alt={produto.descricaoProduto}
                  />
                  <Card.Body>
                    <Card.Title>{produto.nomeProduto}</Card.Title>
                    <Card.Text>{produto.descricaoProduto}</Card.Text>
                    <Card.Text>{FormatarNumero(produto.valorUnitario)}</Card.Text>
                    <Link className="botao-detalhe" to={`/detalhe-produto/${produto.idProduto}`}>
                      Detalhes
                    </Link>
                  </Card.Body>
                </Card>
                </div>
              ))}
              
            </Carousel>
            </>
          )}
        </>
      )}
    </Container>
  );
};
