import React, { useState, useEffect } from 'react';
import api from '../../services/Api';

function ComiteCreate() {
  const [nome, setNome] = useState('');
  const [comite_numero, setComite_numero] = useState('');
  const [comite_pai_id, setComite_pai_id] = useState(null);
  const [localizacao, setLocalizacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [comites, setComites] = useState([]);

  useEffect(() => {
    getComites();
  }, []);

  async function getComites() {
    const response = await api.get('/comites');
    comites
      ? setComites(response.data)
      : setComites([...comites, response.data]);
  }
  async function saveComite(e) {
    e.preventDefault();
    const response = await api.post('/comites', {
      nome,
      comite_numero,
      comite_pai_id,
      localizacao,
      estado: 'Activo',
      descricao,
    });
    setNome('');
    setComite_numero('');
    setComite_pai_id(null);
    setLocalizacao('');
    setDescricao('');
  }

  return (
    <form>
      <h3>Criar Comité</h3>
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
            <select className="custom-select">
              <option value="Activo">Activo</option>
              <option value="Suspenso">Suspenso</option>
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
      <button className="btn btn-master btn-lg btn-block" onClick={saveComite}>
        Criar
      </button>
    </form>
  );
}

export default ComiteCreate;
