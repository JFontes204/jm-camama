import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import api from '../../services/Api';
import Loading from '../Loading';
import './style.css';

function User({ settings }) {
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastClasses, setToastClasses] = useState('');
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).access_token
          }`,
        },
      });
      setUsers(response.data);
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    }
  }

  return (
    <Loading
      myRender={() => (
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
          <div className="row content-header">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
              {settings.user.create ? (
                <Link className="text-link text-link-view" to={'/user-create'}>
                  <button className="btn btn-master mb-1">
                    Novo utilizador
                  </button>
                </Link>
              ) : null}
            </div>
            <h1 className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
              Lista de utilizadores
            </h1>
          </div>
          <table className="table table-striped table-inverse table-responsive tb-style">
            <thead className="thead-inverse thead-dark">
              <tr>
                <th>#</th>
                <th>Militante</th>
                <th>Nome de utilizador</th>
                <th>Estado</th>
                <th>Acção</th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{value.membros.nome}</td>
                      <td>{value.username}</td>
                      <td>{value.estado}</td>
                      <td>
                        <Link
                          className="text-link text-dark"
                          to={'/user-viewer/' + btoa(value.id)}
                          /* to={`/user-update/${btoa(value.id)}`} */
                        >
                          ver
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">
                    <h5>Sem dados para mostrar neste momento.</h5>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    />
  );
}

export default User;
