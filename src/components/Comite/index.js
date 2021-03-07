import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/Api';
import Loading from '../Loading';
import './style.css';

function Comite({ user_id }) {
  const [comites, setComites] = useState([]);
  useEffect(() => {
    getComites();
  }, []);

  const getComites = async () => {
    const { access_token } = JSON.parse(localStorage.getItem('token'));
    const config = {
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };
    const response = await api.get('/comites', config);
    comites
      ? setComites(response.data)
      : setComites([...comites, response.data]);
  };

  return (
    <Loading
      myRender={() => (
        <>
          <div className="row content-header">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
              <Link className="text-link text-link-view" to={'/comite-create'}>
                <button className="btn btn-master mb-1">Novo Comité</button>
              </Link>
            </div>
            <h1 className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
              Lista de Comités
            </h1>
          </div>
          <table className="table table-striped table-inverse table-responsive tb-style">
            <thead className="thead-inverse thead-dark">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Nº</th>
                <th>Localização</th>
                <th>Acção</th>
              </tr>
            </thead>
            <tbody>
              {comites.length ? (
                comites.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{value.nome}</td>
                      <td>{value.comite_numero}</td>
                      <td>{value.localizacao}</td>
                      <td>
                        <Link
                          className="text-link text-dark"
                          to={`/comite-update/${btoa(value.id)}`}
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

export default Comite;
