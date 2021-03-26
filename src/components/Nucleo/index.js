import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/Api';
import Loading from '../Loading';

function Nucleo() {
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastClasses, setToastClasses] = useState('');
  const [nucleos, setNucleos] = useState([]);

  useEffect(() => {
    getNucleos();
  }, []);

  async function getNucleos() {
    try {
      let response = await api.get('/nucleos', {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).access_token
          }`,
        },
      });
      if (!response.data.length) {
        response = {};
        response = await api.get('/nucleos-comite-filho', {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('token')).access_token
            }`,
          },
        });
      }
      setNucleos(response.data);
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
              <Link className="text-link text-link-view" to={'/nucleo-create'}>
                <button className="btn btn-master mb-1">Novo Núcleo</button>
              </Link>
            </div>
            <h1 className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
              Lista de Núcleos
            </h1>
          </div>
          <table className="table table-striped table-inverse table-responsive tb-style">
            <thead className="thead-inverse thead-dark">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Comité nº</th>
                <th>Secretariado</th>
                <th>Acção</th>
              </tr>
            </thead>
            <tbody>
              {nucleos.length ? (
                nucleos.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{value.nome}</td>
                      <td>{value.comites.comite_numero}</td>
                      <td>{value.comites.nome}</td>
                      <td>
                        <Link
                          className="text-link text-dark"
                          to={'/nucleo-viewer/' + btoa(value.id)}
                          /*  to={`/nucleo-update/${btoa(value.id)}`} */
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

export default Nucleo;
