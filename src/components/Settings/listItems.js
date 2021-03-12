import React from 'react';

export default function ListItems({ data }) {
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
                    <a
                      className="text-link text-dark"
                      href={'/#/' + btoa(value.id)}
                    >
                      editar
                    </a>
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
