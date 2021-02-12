import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="outer-login">
        <div className="inner-login">
          <form>
            <h3>
              <img src="/asset/img/logo192.webp" />
            </h3>
            <div className="form-group">
              <label>Nome de utilizador</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome de utilizador"
              />
            </div>
            <div className="form-group">
              <label>Palavra-passe</label>
              <input
                type="password"
                className="form-control"
                placeholder="Palavra-passe"
              />
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Lembrar-se
                </label>
              </div>
            </div>
            <Link to={'/home'} className="text-link">
              <button className="btn btn-lg btn-block btn-master">
                Entrar
              </button>
            </Link>

            {/* <p className="forgot-password text-right">
              Esqueceu a <a href="#">palavra-passe?</a>
            </p> */}
          </form>
        </div>
      </div>
    );
  }
}
