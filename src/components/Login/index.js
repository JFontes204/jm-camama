import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import api from '../../services/Api';
import './style.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastClasses, setToastClasses] = useState('');
  const data = new Date();

  async function startSassion(e) {
    e.preventDefault();
    try {
      if (username && password) {
        const response = await api.post('/logon', { username, password });
        const { token, name } = response.data;
        if (token !== undefined) {
          // Set object into localStorage
          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('name', name);
          window.location.href = '/home';
        } else {
          setToastMsg('Nome de utilizador ou palavra-passe incorrecta!');
          setToastClasses('bg-warning text-white');
          setToastShow(true);
        }
      } else {
        setToastMsg('Preencha os campos utilizador e palavra-passe!');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Toast
        onClose={() => setToastShow(false)}
        show={toastShow}
        delay={4500}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Alerta - SIIM</strong>
          <small>{`${data.getHours()}:${data.getMinutes()}`}</small>
        </Toast.Header>
        <Toast.Body className={`${toastClasses}`}>{toastMsg}</Toast.Body>
      </Toast>
      <div className="outer-login">
        <div className="inner-login">
          <form method="get">
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
    </>
  );
}
