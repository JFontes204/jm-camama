import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/Api';
import Loading from '../Loading';
import './style.css';

function User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await await api.get('/users');
    users ? setUsers(response.data) : setUsers([...users, response.data]);
  };

  return (
    <Loading
      myRender={() => (
        <>
          <div className="row content-header">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
              {/* <Link className="text-link text-link-view" to={'/user-create'}>
                <button className="btn btn-master mb-1">Novo utilizador</button>
              </Link> */}
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
                      <td scope="row">{key + 1}</td>
                      <td>{value.membros.nome}</td>
                      <td>{value.username}</td>
                      <td>{value.estado}</td>
                      <td>
                        <Link
                          className="text-link text-dark"
                          to={`/comite/${btoa(value.id)}`}
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

export default User;
