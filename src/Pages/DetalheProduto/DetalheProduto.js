import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Services/api";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export const DetalheProduto = () => {
  const location = useLocation();

  let { idProduto } = useParams();

  const [produto, setProduto] = useState();
  

  useEffect(() => {
    let carregando = false;
    const getProdutoById = async () => {
      const response = await api.get(`/produto/dto/${idProduto}`);
      setProduto(response.data);
      console.log(response.data);
    };
    getProdutoById();
  }, [location]);

  return (
    <Container>
      {produto !== undefined && (
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
              <span>Vendido e entregue por <label>Grupo 7</label></span>
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

              <h3><span>De:</span> R$ {produto.valorUnitario+100}</h3>
              <h3><span>Por:</span> R$ {produto.valorUnitario}</h3>
              <label><span>3x</span><span>R$ {produto.valorUnitario/3}</span> sem juros no cartão</label>
              <button className="d-block">Comprar</button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
