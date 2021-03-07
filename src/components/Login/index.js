import React, { useState } from 'react';
import api from '../../services/Api';
import './style.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function startSassion(e) {
    e.preventDefault();
    const response = await api.post('/logon', { username, password });
    const { token } = response.data;
    let goto = '/';
    if (token !== undefined) {
      // Set object into localStorage
      localStorage.setItem('token', JSON.stringify(token));
      goto = '/home';
    }
    window.location.href = goto;
  }

  return (
    <div className="outer-login">
      <div className="inner-login">
        <form>
          <div className="logo"></div>
          <div className="form-group">
            <label>Nome de utilizador</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nome de utilizador"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Palavra-passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="Palavra-passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={startSassion}
            className="btn btn-lg btn-block btn-master"
          >
            Entrar
          </button>
          {/* <p className="forgot-password text-right">
              Esqueceu a <a href="#">palavra-passe?</a>
            </p> */}
        </form>
      </div>
    </div>
  );
}
