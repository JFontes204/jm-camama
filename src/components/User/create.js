import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/Api';

function UserCreate(props) {
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastClasses, setToastClasses] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [membro_id, setMembro_id] = useState('');
  const [militantes, setMilitantes] = useState([]);

  useEffect(() => {
    getMilitantes();
  }, []);

  async function getMilitantes() {
    try {
      const response = await api.get('/militantes/all/any', {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).access_token
          }`,
        },
      });
      setMilitantes(response.data);
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    }
  }

  async function saveUser(e) {
    e.preventDefault();
    try {
      const response = await api.post(
        '/users',
        {
          username,
          password,
          membro_id,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('token')).access_token
            }`,
          },
        }
      );
      if (Object.keys(response.data).length > 0) {
        setUsername('');
        setPassword('');
        setMembro_id('');
        setToastMsg('Criado com sucesso!');
        setToastClasses('text-dark');
        setToastShow(true);
        setTimeout(() => (window.location.href = '/user'), 2000);
      } else {
        setToastMsg('Falha ao criar no utilizador!');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
      } else {
        setToastMsg('Falha ao criar no utilizador!');
      }
      setToastClasses('bg-warning text-white');
      setToastShow(true);
    }
  }

  return (
    <>
      <Toast
        onClose={() => setToastShow(false)}
        show={toastShow}
        delay={2500}
        autohide
      >
        <Toast.Body className={`${toastClasses}`}>
          <strong>{toastMsg}</strong>
        </Toast.Body>
      </Toast>
      <form>
        <div className="row content-header">
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
            <Link className="text-link text-link-view" to={'/user'}>
              <button className="btn btn-second mb-1">Voltar</button>
            </Link>
          </div>
          <h3 className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
            Criar utilizador
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Militante</label>
              <select
                className="custom-select"
                onChange={(e) => setMembro_id(e.target.value)}
              >
                <option value="-1">Escolhe um militante</option>
                {militantes.map((value, key) => {
                  return (
                    <option key={key} value={value.id}>
                      {value.nome}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
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
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
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
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-master btn-lg btn-block"
          onClick={saveUser}
        >
          Criar
        </button>
      </form>
    </>
  );
}
export default UserCreate;
