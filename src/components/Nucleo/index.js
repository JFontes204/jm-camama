import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/Api';
import Loading from '../Loading';

function Nucleo() {
  const [nucleos, setNucleos] = useState([]);
  useEffect(() => {
    getNucleos();
  }, []);

  const getNucleos = async () => {
    const response = await api.get('/nucleos');
    nucleos
      ? setNucleos(response.data)
      : setNucleos([...nucleos, response.data]);
  };

  return (
    <Loading
      myRender={() => (
        <>
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
                <th>Sigla</th>
                <th>Comité</th>
                <th>Acção</th>
              </tr>
            </thead>
            <tbody>
              {nucleos.length ? (
                nucleos.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td scope="row">{key + 1}</td>
                      <td>{value.nome}</td>
                      <td>{value.sigla}</td>
                      <td>{value.comites.nome}</td>
                      <td>
                        <Link
                          className="text-link text-dark"
                          to={`/nucleo/${btoa(value.id)}`}
                        >
                          ver
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h5>Sem dados para mostrar neste momento.</h5>
              )}
            </tbody>
          </table>
        </>
      )}
    />
  );
}

export default Nucleo;
