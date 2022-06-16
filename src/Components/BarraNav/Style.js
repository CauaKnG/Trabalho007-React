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
  width: 100%;
  top: 0;
`

export const Lista = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
`

export const Individual = styled.li`
    margin-left: 30px;
    color: white;
    font-weight: 600;
    text-decoration: none;
    &:hover{
        cursor: pointer;
    }
    
`

export const Cabecalho = styled.div`
    background: #1A0ECD;
`

export const BarraPesquisa = styled.div`
  background-color:#E0EEEE;
  border:solid 2px #5F9EA0;
  border-radius:5px;
  width: 41.8%;
  height:22px;
  display: flex;
`

export const InputPesquisa = styled.input`
  float:left;
  background-color:transparent;
  padding-right: 6.15rem;
  padding-left:5px;
  font-size:18px;
  border:none;
  height:22px;
  width:58.92%;
  outline: none;
`

export const BotaoPesquisa = styled.button`
  border:none;
  float:left;
  height:22px;
  width: 20.4%;
  font-weight:bold;
  color: #08034A;
  background: rgba(113, 176, 250, 0.63);
  cursor: pointer;
`