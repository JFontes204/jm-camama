import React, { useState, useEffect } from 'react';
import api from '../../services/Api';

function Create() {
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [descricao, setDescricao] = useState('');
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

  const saveNucleo = async (e) => {
    e.preventDefault();
    const response = await api.post('/nucleos', {
      nome,
      sigla,
      descricao,
      comite_id,
      estado: 'Activo',
    });
    setNome('');
    setSigla('');
    setDescricao('');
    setComite_id(null);
  };
  return (
    <form>
      <h3>Criar Núcleo</h3>
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
