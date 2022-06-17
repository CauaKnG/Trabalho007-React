import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import "./Style.scss"

export const Carrossel=() => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images-americanas.b2w.io/produtos/3931882056/imagens/tenis-esportivo-masculino-liso-caminhada-confortavel-44/3931882371_1_large.jpg"
          alt="Third slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.tradeinn.com/f/125/1252953/vans-treinadores-old-skool.jpg"
          alt="First slide"
        />
      </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://d3ugyf2ht6aenh.cloudfront.net/stores/786/072/products/saint-laurent-sandalia-opyum-com-salto-110mm-preto1-9bbb6820b36103d05816381866467577-1024-1024.jpg"
              alt="Fourth slide"
              />
              </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://static.zattini.com.br/produtos/bota-coturno-feminina-vicerinne-tratorada-salto-alto/06/GYK-0049-006/GYK-0049-006_zoom3.jpg?ts=1632126026&ims=544x"
          alt="Second slide"
        />


      </Carousel.Item>
    </Carousel>
  );
}