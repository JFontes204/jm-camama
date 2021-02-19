import './style.css';
import React from 'react';
import Loading from '../Loading';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

function Home() {
  return (
    <Loading
      myRender={() => (
        <div className="inner-carousel">
          <Carousel>
            <div className="bg-white">
              <img src="asset/img/11.jpg" />
              <p className="legend">Camarada João Lourenço</p>
            </div>
            <div className="bg-white">
              <img src="asset/img/12.jpg" />
              <p className="legend">Presidente João Lourenço</p>
            </div>
            <div className="bg-white">
              <img src="asset/img/13.jpeg" />
              <p className="legend">Presidente do Partido</p>
            </div>
            <div className="bg-white">
              <img src="asset/img/14.jpg" />
              <p className="legend">Camarada João Lourenço</p>
            </div>
            <div className="bg-white">
              <img src="asset/img/15.jpg" />
              <p className="legend">Presidente João Lourenço</p>
            </div>
            <div className="bg-white">
              <img src="asset/img/16.jpg" />
              <p className="legend">Presidente do Partido</p>
            </div>
            <div className="bg-white">
              <img src="asset/img/17.jpg" />
              <p className="legend">Presidente do Partido</p>
            </div>
            <div className="bg-white">
              <img src="asset/img/18.png" />
              <p className="legend">Camarada João Lourenço</p>
            </div>
            <div className="bg-white">
              <img src="asset/img/19.jpg" />
              <p className="legend">Camarada João Lourenço</p>
            </div>
            <div className="bg-white">
              <img src="asset/img/20.jpg" />
              <p className="legend">Camarada João Lourenço</p>
            </div>
          </Carousel>
        </div>
      )}
    />
  );
}

export default Home;
