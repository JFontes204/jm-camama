import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import api from '../../services/Api';

function ComiteCreate() {
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastClasses, setToastClasses] = useState('');
  const [nome, setNome] = useState('');
  const [comite_numero, setComite_numero] = useState('');
  const [comite_pai_id, setComite_pai_id] = useState(null);
  const [localizacao, setLocalizacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [estado, setEstado] = useState('');
  const [comites, setComites] = useState([]);

  useEffect(() => {
    getComites();
  }, []);

  async function getComites() {
    try {
      const response = await api.get('/comites/all/any', {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).access_token
          }`,
        },
      });
      comites
        ? setComites(response.data)
        : setComites([...comites, response.data]);
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    }
  }
  async function saveComite(e) {
    e.preventDefault();
    try {
      const response = await api.post(
        '/comites',
        {
          nome,
          comite_numero,
          comite_pai_id,
          localizacao,
          estado,
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
        setComite_numero('');
        setComite_pai_id(null);
        setLocalizacao('');
        setEstado('');
        setDescricao('');
        setToastMsg('Criado com sucesso!');
        setToastClasses('text-dark');
        setToastShow(true);
        setTimeout(() => (window.location.href = '/comite'), 2500);
      } else {
        setToastMsg('Falha ao criar novo Comité!');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
      } else {
        setToastMsg('Falha ao criar novo Comité!');
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
            <Link className="text-link text-link-view" to={'/comite'}>
              <button className="btn btn-second mb-1">Voltar</button>
            </Link>
          </div>
          <h3 className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
            Criar novo Comité
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Nome do Comité</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Comité"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Comité nº</label>
              <input
                type="text"
                className="form-control"
                placeholder="Comité nº"
                value={comite_numero}
                onChange={(e) => setComite_numero(e.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Comité tutelar</label>
              <select
                onChange={(e) => setComite_pai_id(e.target.value)}
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
                <option value={null}>Sem Comité tutelar</option>
              </select>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Estado do Comité</label>
              <select
                onChange={(e) => setEstado(e.target.value)}
                className="custom-select"
              >
                <option value="0">Escolhe um estado</option>
                <option value="Activo">Activo</option>
                <option value="Suspenso">Suspenso</option>
                <option value="Fechado">Fechado</option>
                <option value="Em manutenção">Em manutenção</option>
                <option value="Por abrir">Por abrir</option>
              </select>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Localização do Comité</label>
              <textarea
                className="form-control"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
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
          className="btn btn-master btn-lg btn-block"
          onClick={saveComite}
        >
          Criar
        </button>
      </form>
    </>
  );
}

export default ComiteCreate;
