import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/Api';
import Loading from '../Loading';

function Militante() {
  const [militantes, setMilitantes] = useState([]);
  useEffect(() => {
    getMilitantes();
  }, []);

  const getMilitantes = async () => {
    const response = await api.get('/militantes');
    militantes
      ? setMilitantes(response.data)
      : setMilitantes([...militantes, response.data]);
  };

  function tempoDeMilitancia(ano) {
    const data = new Date();
    return data.getFullYear() - ano;
  }

  return (
    <Loading
      myRender={() => (
        <>
          <div className="row content-header">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
              {/* <Link
                className="text-link text-link-view"
                to={'/militante-create'}
              >
                <button className="btn btn-master mb-1">Novo Militante</button>
              </Link> */}
            </div>
            <h1 className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
              Lista de Militantes
            </h1>
          </div>
          <table className="table table-striped table-inverse table-responsive tb-style">
            <thead className="thead-inverse thead-dark">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Anos de militancia</th>
                <th>Comité</th>
                <th>Acção</th>
              </tr>
            </thead>
            <tbody>
              {militantes.length ? (
                militantes.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td scope="row">{key + 1}</td>
                      <td>{value.nome}</td>
                      <td>{value.telefone1}</td>
                      <td>{tempoDeMilitancia(value.ano_inicio_militancia)}</td>
                      <td>{value.comites.nome}</td>
                      <td>
                        <Link
                          className="text-link text-dark"
                          to={`/militante/${btoa(value.id)}`}
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
export default Militante;
