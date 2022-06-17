import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { api } from "../../Services/api";

export const Produtos = () => {
    let lista = []
    let { categoria } = useParams()
    const [listaProdutos, setListaProdutos] = useState();
    useEffect(() => {
        const getProdutosByCategoria = async () => {
            const response = await api.get(`/categoria/produto/dto/nome/${categoria}`)
            console.log(response.data);
            setListaProdutos(response.data.produtoList);
        }
        getProdutosByCategoria();
    }, [])
    //     listaProdutos.map(produto =>
    //     console.log(produto)
    // )
    console.log(listaProdutos)

    return (
        <>
            {listaProdutos !== undefined && (
                <div>
                    {
                        listaProdutos.map((produto) =>
                            <h1 key={produto.idProduto}>{produto.idProduto}</h1>
                        )
                    }
                </div>
            )}


        </>
    )
}