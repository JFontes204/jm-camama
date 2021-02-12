import React, { useState, useEffect } from 'react';
import api from '../../services/Api';

function Create() {
  const [nome_actividade, setNome_actividade] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [convidados, setConvidados] = useState('');
  const [comite_id, setComite_id] = useState(null);
  const [comites, setComites] = useState([]);

  useEffect(() => {
    getComites();
  }, []);

  const getComites = async () => {
    const response = await api.get('/comites');
    comites
      ? setComites(response.data)
      : setComites([...comites, response.data]);
  };

  const saveAgenda = async (e) => {
    e.preventDefault();
    const response = await api.post('/agenda', {
      nome_actividade,
      local,
      descricao,
      data_e_hora: data + 'T' + hora + ':00.698Z',
      convidados,
      comite_id,
      estado: 'Activo',
    });
    setNome_actividade('');
    setLocal('');
    setDescricao('');
    setData('');
    setHora('');
    setConvidados('');
    setComite_id(null);
  };
  return (
    <form>
      <h3>Criar Actividade</h3>
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
              placeholder="ex.: 10:30"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Convidados</label>
            <input
              type="text"
              className="form-control"
              placeholder="Convidados para actividade"
              value={convidados}
              onChange={(e) => setConvidados(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Comité organizador</label>
            <select
              onChange={(e) => setComite_id(e.target.value)}
              className="custom-select"
            >
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
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Estado da actividade</label>
            <select className="custom-select">
              <option value="Activo">Activo</option>
              <option value="Suspenso">Suspenso</option>
              <option value="Em manutenção">Em manutenção</option>
              <option value="Por abrir">Por abrir</option>
            </select>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-master btn-lg btn-block"
        onClick={saveAgenda}
      >
        Criar
      </button>
    </form>
  );
}

export default Create;
