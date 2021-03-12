import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../services/Api';

function Create() {
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastClasses, setToastClasses] = useState('');
  const [nome_actividade, setNome_actividade] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [convidados, setConvidados] = useState('');
  const [estado, setEstado] = useState('');

  async function saveAgenda(e) {
    e.preventDefault();
    try {
      const response = await api.post(
        '/agenda',
        {
          nome_actividade,
          local,
          descricao,
          data_e_hora: data + 'T' + hora + ':00.698Z',
          convidados,
          estado,
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
        setNome_actividade('');
        setLocal('');
        setDescricao('');
        setData('');
        setHora('');
        setEstado('');
        setConvidados('');
        setToastMsg('Criado com sucesso!');
        setToastClasses('text-dark');
        setToastShow(true);
        setTimeout(() => (window.location.href = '/agenda'), 2000);
      } else {
        setToastMsg('Falha ao criar nova actividade!');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
      } else {
        setToastMsg('Falha ao criar nova actividade!');
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
            <Link className="text-link text-link-view" to={'/agenda'}>
              <button className="btn btn-second mb-1">Voltar</button>
            </Link>
          </div>
          <h3 className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
            Criar nova actividade
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Nome da actividade</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome da actividade"
                value={nome_actividade}
                onChange={(e) => setNome_actividade(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Local</label>
              <input
                type="text"
                className="form-control"
                placeholder="Local da actividade"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                className="form-control"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Hora</label>
              <input
                type="text"
                className="form-control"
                placeholder="ex.: 09:30"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Convidados</label>
              <textarea
                className="form-control"
                placeholder="Convidados para actividade"
                value={convidados}
                onChange={(e) => setConvidados(e.target.value)}
              />
            </div>
          </div>
          {/* <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Comité organizador</label>
              <select
                onChange={(e) => setComite_id(e.target.value)}
                className="custom-select"
              >
                <option key="-1" value="0">
                  Escolhe um Comité
                </option>
                {comites.map((value, key) => (
                  <option key={key} value={value.id}>
                    {value.nome}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

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

          {/* <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Estado da actividade</label>
              <select
                onChange={(e) => setEstado(e.target.value)}
                className="custom-select"
              >
                <option value="0">Escolhe um estado</option>
                <option value="Activa">Activa</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Em analise">Em analise</option>
                <option value="Realizada">Realizada</option>
              </select>
            </div>
          </div> */}
        </div>
        <button
          type="submit"
          className="btn btn-master btn-lg btn-block"
          onClick={saveAgenda}
        >
          Criar
        </button>
      </form>
    </>
  );
}

export default Create;
