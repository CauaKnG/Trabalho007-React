import { useParams } from "react-router-dom";
import React, { useState } from "react";

export const Produtos = () => {

    let {categoria} = useParams()
    
    return(
        <>
    <h1>{categoria}</h1>
        </>
    )
}