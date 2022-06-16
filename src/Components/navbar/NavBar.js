import React from "react";

export const NavBar = () =>{
    return(<>
    <header>
      <a class="logo" href="index.html">
        <img src="./assets/imagens/logo.png" alt="" />
      </a>
      <nav>
        <div class="container-btn-menu d-lg-none">
          <div class="btn-menu">
            <div class="btn-left"></div>
            <div class="btn-right"></div>
          </div>
        </div>
        <ul class="navegacao">
          <li><Link to= "" >Login </Link></li>
          <li><Link to= "" >Carrinho </Link></li>
        </ul>
      </nav>
    </header>
        </>)
}