import styled from "styled-components"

export const Titulo = styled.h3`
    color: white;
    font-size: 1.6rem;
    text-decoration: none;
    &:hover{
        cursor: pointer;
    }
`

export const Header = styled.header`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 20px;
  align-items: center;
`

export const Lista = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
`

export const Individual = styled.li`
   
    color: white;
    font-weight: 600;
    text-decoration: none;
    &:hover{
        cursor: pointer;
    }&:first-child{
      margin-right: 30px;
    }
    
`

export const Cabecalho = styled.div`
    background: #1A0ECD;
`
