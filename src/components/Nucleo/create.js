import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import api from '../../services/Api';

function Create() {
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [descricao, setDescricao] = useState('');
  const [comite_id, setComite_id] = useState(null);
  const [comites, setComites] = useState([]);
  const [config, setConfig] = useState({});

  useEffect(() => {
    const { access_token } = JSON.parse(localStorage.getItem('token'));
    setConfig({
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    });
    getComites();
  }, []);

  const getComites = async () => {
    const response = await api.get('/comites/all=*', config);
    comites
      ? setComites(response.data)
      : setComites([...comites, response.data]);
  };

  const saveNucleo = async (e) => {
    e.preventDefault();
    const response = await api.post(
      '/nucleos',
      {
        nome,
        sigla,
        descricao,
        comite_id,
        estado: 'Activo',
      },
      config
    );
    if (Object.keys(response.data).length > 0) {
      setNome('');
      setSigla('');
      setDescricao('');
      setComite_id(null);
      window.location.href = '/nucleo';
    }
  };
  return (
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
            <label>Comité</label>
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
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Descrição</label>
            <textarea
              className="form-control"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
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
  );
}

export default Create;
