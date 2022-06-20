import React from "react";

import { Link } from "react-router-dom";
import "./Style.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const Destaques = () => {
  return (
    <div className="container">
      <p className="titulo-card">Mais vendidos</p>
      <div className="cards">
        <Card>
          <Card.Img
            variant="top"
            src="https://cea.vtexassets.com/arquivos/ids/47357725-800-auto?v=637634831643370000&width=800&height=auto&aspect=true"
            alt="Tenis casual"
          />
          <Card.Body>
            <Card.Title>Tênis Artesanal</Card.Title>
            <Card.Text>Tênis casual modelo tradicional</Card.Text>
          </Card.Body>
          <Link className="botao-card" to="/detalhe-produto/17">
            Conferir
          </Link>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-hKFZdAhxAfl5-B2dYPaYsn58uHtQfvAn2mCgI_0FCgYCxo2ybtazmbk8n-ctsHaq-_M&usqp=CAU"
            alt="Sandalia preta"
          />
          <Card.Body>
            <Card.Title>Sandália Vanna Tresoldi</Card.Title>
            <Card.Text>Sandália Transpassada Salto Médio</Card.Text>
          </Card.Body>
          <Link className="botao-card" to="/detalhe-produto/20">
            Conferir
          </Link>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src="https://a-static.mlcdn.com.br/800x560/tenis-esportivo-masculino-olimp-caminhada-academia-original-olimpak/vili/ptoryl43/e95f52eedda699d1f8ece25dcdd89aaa.jpg"
            alt="Tenis esportivo preto"
          />
          <Card.Body>
            <Card.Title>Tênis Olimpak</Card.Title>
            <Card.Text>Tênis Olimpak Esportivo</Card.Text>
          </Card.Body>
          <Link className="botao-card" to="/detalhe-produto/3">
            Conferir
          </Link>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src="https://40378.cdn.simplo7.net/static/40378/sku/feminino-601828bf9458f-outros-calcados-bota-feminina-coturno-tratorada-prada-1619530975730.jpg"
            alt="Bota da Prada"
          />
          <Card.Body>
            <Card.Title>Bota Prada</Card.Title>
            <Card.Text>Bota Prada de Couro Marrom</Card.Text>
          </Card.Body>
          <Link className="botao-card" to="/detalhe-produto/28">
            Conferir
          </Link>
        </Card>
      </div>
    </div>
  );
};
