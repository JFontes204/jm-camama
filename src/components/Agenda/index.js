import Loading from '../Loading';
import api from '../../services/Api';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import dataFormate from '../../utils/dataFormate';

function Agenda() {
  const [agenda, setAgenda] = useState([]);
  useEffect(() => {
    getAgenda();
  }, []);

  const getAgenda = async () => {
    const response = await api.get('/agenda');
    agenda ? setAgenda(response.data) : setAgenda([...agenda, response.data]);
  };

  return (
    <Loading
      myRender={() => (
        <>
          <div className="row content-header">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
              {/* <Link to="/agenda-create" className="text-link text-link-view">
                <button className="btn btn-master mb-1">Nova Actividade</button>
              </Link> */}
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
                <th>Comité</th>
                <th>Acção</th>
              </tr>
            </thead>
            <tbody>
              {agenda.length ? (
                agenda.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td scope="row">{key + 1}</td>
                      <td>{value.nome_actividade}</td>
                      <td>{value.local}</td>
                      <td>{dataFormate(value.data_e_hora)}</td>
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
                <tr>Sem dados para mostrar neste momento.</tr>
              )}
            </tbody>
          </table>
        </>
      )}
    />
  );
}

export default Agenda;
