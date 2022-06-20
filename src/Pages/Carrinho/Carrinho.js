import React, { useState } from "react";
import { useCarrinho } from "../../Contexts/CarrinhoContext";
import { CardCarrinho } from "./CardCarrinho";
import Container from "react-bootstrap/Container";
import "./Style.scss";

export const Carrinho = () => {
  const carrinho = useCarrinho();

  const remover = (id) => () => {
    carrinho.removerDoCarrinho(id);
  };

  const mudarQuantidade = (id) => (evento) => {
    carrinho.mudarQuantidadeContext(id, evento.target.value);
  };

  const limpar = () => {
    carrinho.limparCarrinho();
  };

  const finalizar = () => {
    carrinho.finalizarCompra();
  };

  return (
    <>
      <Container>
        <h1>Seu carrinho de compra:</h1>
        <div className="container-cards">
          {Object.keys(carrinho.carrinho).map((chave) => {
            const produto = carrinho.carrinho[chave];
            return (
              <CardCarrinho className="card" key={chave}>
                <img
                  src={produto.imagemProduto}
                  alt={produto.descricaoProduto}
                />

                <div className="campo detalhe-produto">
                  <h1>PRODUTO</h1>
                  <div>
                    <label>{produto.nomeProduto}</label>
                    <p>{produto.descricaoProduto}</p>
                    <button onClick={remover(produto.idProduto)}>
                      Remover item
                    </button>
                  </div>
                </div>

                <div className="campo quantidade-produto">
                  <h1>QUANTIDADE</h1>
                  <div className="quantidade-container">
                    {/* <button>-</button>
                    <span>{produto.quantidade}</span>
                    <button onClick={add(produto.idProduto)}>+</button> */}
                    <input
                      id="quantidade"
                      type="number"
                      defaultValue={produto.quantidade}
                      onBlur={mudarQuantidade(chave)}
                    />
                  </div>
                </div>

                <div className="campo preco-unitario">
                  <h1>PREÇO UNITÁRIO</h1>
                  <span>R$ {produto.valorUnitario}</span>
                </div>

                <div className="campo preco-total">
                  <h1>PREÇO TOTAL</h1>
                  <span>R$ {produto.valorUnitario * produto.quantidade}</span>
                </div>
              </CardCarrinho>
            );
          })}
        </div>
        <div className="checkout-container">
          <div className="finalizar">
            <button onClick={finalizar} className="btn-finalizar-compra">
              Finalizar compra
            </button>
          </div>
          <div className="limpar-carrinho">
            <button onClick={limpar} className="btn-limpar-carrinho">
              Limpar carrinho
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};
