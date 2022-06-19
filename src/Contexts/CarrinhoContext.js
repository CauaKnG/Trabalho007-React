import React, { createContext, useContext, useState } from "react";

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState({});
  const addCarrinho = (produto) => {
    debugger
    setCarrinho((antigo) => {
      let quantidade = 0;
      if (antigo[produto.idProduto]) {
        quantidade = antigo[produto.idProduto].quantidade;
      }
      const novoCarrinho ={
        ...antigo,
        [produto.idProduto]:{
          quantidade:quantidade++,
          ...produto
        }
      }
      window.localStorage.setItem("carrinho",JSON.stringify(novoCarrinho))
    });
  };
  return (
    <CarrinhoContext.Provider value={{ carrinho, addCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};
export const useCarrinho = () => {
  const carrinho = useContext(CarrinhoContext);
  return carrinho;
};
