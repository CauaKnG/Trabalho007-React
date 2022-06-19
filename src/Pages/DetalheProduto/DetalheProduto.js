import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Services/api";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "react-bootstrap/Card";
import { useLocation, Link } from "react-router-dom";


export const DetalheProduto = () => {
  const location = useLocation();

  let { idProduto } = useParams();

  const [produto, setProduto] = useState();
  const [produtosRelacionados, setProdutosRelacionados] = useState();

  let categoria;

  useEffect(() => {
    let carregando = false;
    const getProdutoById = async () => {
      const responseProdutos = await api.get(`/produto/dto/${idProduto}`);
      setProduto(responseProdutos.data);
      var nomeCategoria = responseProdutos.data.categoriaDTO.nomeCategoria
      const getProdutosRelacionados = async () => {
        categoria = nomeCategoria.normalize("NFD");
        categoria = categoria[0].toUpperCase() + categoria.substring(1);
        const response = await api.get(
          `/categoria/produto/dto/nome/${categoria}`
        );
        setProdutosRelacionados(response.data.produtoList);
        console.log(response.data.produtoList);
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
              <img
                src={produto.imagemProduto.toString()}
                alt={produto.descricaoProduto}
              />
            </div>
            <div className="col-lg-5">
              <div>
                <h1>{produto.descricaoProduto}</h1>
                <span>
                  Vendido e entregue por <label>Grupo 7</label>
                </span>
                <Form.Select>
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

                <h3>
                  <span>De:</span> R$ {produto.valorUnitario + 100}
                </h3>
                <h3>
                  <span>Por:</span> R$ {produto.valorUnitario}
                </h3>
                <label>
                  <span>3x</span>
                  <span>R$ {produto.valorUnitario / 3}</span> sem juros no
                  cartão
                </label>
                <button className="d-block">Comprar</button>
              </div>
            </div>
          </div>
          {produtosRelacionados !== undefined && (
          <Carousel responsive={responsive}>
            
          {produtosRelacionados.map((produto, index) => (
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
               <Link to={`/detalhe-produto/${produto.idProduto}`}>
                 Comprar
               </Link>
             </Card.Body>
           </Card>
            
          ))}
            
          </Carousel> )}
        </>
      )}
    </Container>
  );
};
