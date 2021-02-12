import './style.css';
import React from 'react';
import Loading from '../Loading';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

function Home() {
  return (
    <Loading
      myRender={() => (
        <Carousel>
          <div className="bg-white">
            <img src="asset/img/1.png" />
            <p className="legend">Camarada João Lourenço</p>
          </div>
          <div className="bg-white">
            <img src="asset/img/2.png" />
            <p className="legend">Presidente João Lourenço</p>
          </div>
          <div className="bg-white">
            <img src="asset/img/3.png" />
            <p className="legend">Presidente do Partido</p>
          </div>
          <div className="bg-white">
            <img src="asset/img/4.png" />
            <p className="legend">Camarada João Lourenço</p>
          </div>
          <div className="bg-white">
            <img src="asset/img/5.png" />
            <p className="legend">Presidente João Lourenço</p>
          </div>
          <div className="bg-white">
            <img src="asset/img/6.png" />
            <p className="legend">Presidente do Partido</p>
          </div>
          <div className="bg-white">
            <img src="asset/img/7.png" />
            <p className="legend">Presidente do Partido</p>
          </div>
          <div className="bg-white">
            <img src="asset/img/8.png" />
            <p className="legend">Camarada João Lourenço</p>
          </div>
        </Carousel>
      )}
    />
  );
}

export default Home;
