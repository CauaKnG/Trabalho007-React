import React, { createContext, useContext, useEffect, useState } from "react";

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const carrinhoLocal = window.localStorage.getItem("carrinho");
    if (carrinhoLocal) {
      setCarrinho(JSON.parse(carrinhoLocal));
    }
  }, []);

  const addCarrinho = (produto) => {
    //debugger
    setCarrinho((antigo) => {
      let quantidade = 0;
      if (antigo[produto.idProduto]) {
        quantidade = antigo[produto.idProduto].quantidade;
      }
      const novoCarrinho = {
        ...antigo,
        [produto.idProduto]: {
          quantidade: quantidade + 1,
          ...produto,
        },
      };
      window.localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      return novoCarrinho;
    });
  };

  const removerDoCarrinho = (produtoID) => {
    setCarrinho((antigo) => {
      const novoCarrinho = {};
      Object.keys(antigo).forEach((id) => {
        if (id != produtoID) {
          novoCarrinho[id] = antigo[id];
        }
      });
      window.localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      return novoCarrinho;
    });
  };

  const mudarQuantidadeContext = (produtoID, novaQuantidade) => {
    setCarrinho((antigo) => {
      const novoCarrinho = {};
      Object.keys(antigo).forEach((id) => {
        const novoProduto = { ...antigo[id] };
        if (id == produtoID) {
          novoProduto.quantidade = novaQuantidade;
        }
        novoCarrinho[id] = novoProduto;
      });
      window.localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      return novoCarrinho;
    });
  };

  const limparCarrinho = () => {
    setCarrinho({});
    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
    return carrinho;
  };

  const finalizarCompra = () => {
    setCarrinho({});
    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
    return carrinho;
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        addCarrinho,
        removerDoCarrinho,
        mudarQuantidadeContext,
        limparCarrinho,
        finalizarCompra,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const carrinho = useContext(CarrinhoContext);
  return carrinho;
};
