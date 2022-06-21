import React from "react";
import { useCarrinho } from "../../Contexts/CarrinhoContext";
import Container from "react-bootstrap/Container";
import { FormatarNumero } from "../../Utils/FormatarNumero";
import { BotaoFinalizar, BotaoLimpar, ContainerPai, Subtitulo, CardCarrinho } from "./Style";

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
        <Subtitulo>Seu carrinho de compra:</Subtitulo>
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
                  <h1 className="negrito">PRODUTO</h1>
                  <div>
                    <label>{produto.nomeProduto}</label>
                    <p>{produto.descricaoProduto}</p>
                    <button onClick={remover(produto.idProduto)}>
                      Remover item
                    </button>
                  </div>
                </div>

                <div className="campo quantidade-produto">
                  <h1 className="negrito">QUANTIDADE:</h1>
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
                  <h1 className="negrito">PREÇO UNITÁRIO:</h1>
                  <span>{FormatarNumero(produto.valorUnitario)}</span>
                </div>

                <div className="campo preco-total">
                  <h1 className="negrito">PREÇO TOTAL:</h1>
                  <span>{FormatarNumero(produto.valorUnitario * produto.quantidade)}</span>
                </div>
              </CardCarrinho>
            );
          })}
        </div>
        <ContainerPai>
        <div className="limpar-carrinho">
            <BotaoLimpar onClick={limpar} className="btn-limpar-carrinho">
              Limpar carrinho
            </BotaoLimpar>
          </div>
          <div className="finalizar">
            <BotaoFinalizar onClick={finalizar} className="btn-finalizar-compra">
              Finalizar compra
            </BotaoFinalizar>
          </div>
        </ContainerPai>
      </Container>
    </>
  );
};
