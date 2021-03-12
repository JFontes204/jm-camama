import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/Api';

function Create() {
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastClasses, setToastClasses] = useState('');
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [descricao, setDescricao] = useState('');

  async function saveNucleo(e) {
    e.preventDefault();
    try {
      const response = await api.post(
        '/nucleos',
        {
          nome,
          sigla,
          descricao,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('token')).access_token
            }`,
          },
        }
      );
      if (Object.keys(response.data).length > 0) {
        setNome('');
        setSigla('');
        setDescricao('');
        setToastMsg('Criado com sucesso!');
        setToastClasses('text-dark');
        setToastShow(true);
        setTimeout(() => (window.location.href = '/nucleo'), 2000);
      } else {
        setToastMsg('Falha ao criar novo núcleo!');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
      } else {
        setToastMsg('Falha ao criar novo núcleo!');
      }
      setToastClasses('bg-warning text-white');
      setToastShow(true);
    }
  }
  return (
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
      <form>
        <div className="row content-header">
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
            <Link className="text-link text-link-view" to={'/nucleo'}>
              <button className="btn btn-second mb-1">Voltar</button>
            </Link>
          </div>
          <h1 className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
            Criar novo Núcleo
          </h1>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Núcleo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Sigla</label>
              <input
                type="text"
                className="form-control"
                placeholder="Sigla"
                value={sigla}
                onChange={(e) => setSigla(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Descrição</label>
              <textarea
                className="form-control"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-master btn-lg btn-block"
          onClick={saveNucleo}
        >
          Criar
        </button>
      </form>
    </>
  );
}

export default Create;
