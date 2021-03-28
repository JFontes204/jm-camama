import Loading from '../Loading';
import api from '../../services/Api';
import { Link } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import dataFormate from '../../utils/dataFormate';

function Agenda({ settings }) {
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastClasses, setToastClasses] = useState('');
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    getAgenda();
  }, []);

  async function getAgenda() {
    try {
      const response = await api.get('/agenda', {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).access_token
          }`,
        },
      });
      agenda ? setAgenda(response.data) : setAgenda([...agenda, response.data]);
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
              {settings.agenda.create ? (
                <Link to="/agenda-create" className="text-link text-link-view">
                  <button className="btn btn-master mb-1">
                    Nova Actividade
                  </button>
                </Link>
              ) : null}
            </div>
            <h1 className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
              Lista de actividades
            </h1>
          </div>
          <table className="table table-striped table-inverse table-responsive tb-style">
            <thead className="thead-inverse thead-dark">
              <tr>
                <th>#</th>
                <th>Actividade</th>
                <th>Local</th>
                <th>Data & hora</th>
                <th>Secretariado</th>
                <th>Acção</th>
              </tr>
            </thead>
            <tbody>
              {agenda.length ? (
                agenda.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{value.nome_actividade}</td>
                      <td>{value.local}</td>
                      <td>{dataFormate(value.data_e_hora)}</td>
                      <td>{value.comites.nome}</td>
                      <td>
                        <Link
                          className="text-link text-dark"
                          to={'/agenda-viewer/' + btoa(value.id)}
                          /*  to={'/agenda-update/' + btoa(value.id)} */
                        >
                          ver
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">
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

export default Agenda;
