import styled from "styled-components";

export const FormularioAdmin = styled.div`

display: flex;
justify-content: center;

form{
    border-radius: 8px;
    border:1px solid black;
    padding:20px;
    max-width:1000px;
    width:100%;
    button{
        margin:0 auto;
        display:block;
        max-width:50%;
    }
    .cadastro{
        color:black;
        display:block;
        margin-top:15px;
        text-align:center;
        a{
            margin-left:5px;
        }
    }
}
`