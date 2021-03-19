import React from 'react';
import { Link } from 'react-router-dom';

export default function ListItems({ data, showModal }) {
  return (
    <>
      <table className="table table-striped table-inverse table-responsive tb-style">
        <thead className="thead-inverse thead-dark">
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Sigla</th>
            <th>Acção</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((value, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{value.nome}</td>
                  <td>{value.sigla}</td>
                  <td>
                    <Link
                      to="#"
                      className="text-link text-dark"
                      onClick={() => showModal(btoa(value.id))}
                    >
                      editar
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
  );
}
