import styled from "styled-components";

export const CardCarrinho = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  margin: 0 0 1rem;

  @media screen and (min-width: 992px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  img {
    width: 180px;
    height: 180px;
    margin: 0 auto;
  }

  .campo {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 8px;
    h1 {
      font-size: 14px;
    }

    button {
      background-color: #0d6efd;
      border: none;
      outline: none;
      border-radius: 4px;
      color: #fff;
      padding: 5px;
      min-width: 20px;
    }

    input {
      max-width: 100px;
    }
  }

  @media screen and (min-width: 992px) {
    img {
      width: 150px;
      height: 150px;
      margin: 0;
    }

    .campo {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0;
      max-width: 260px;
    }

    .campo.detalhe-produto {
      align-items: flex-start;
    }
  }
`;
