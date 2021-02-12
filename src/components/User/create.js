import React, { useState, useEffect } from 'react';
import api from '../../services/Api';

function UserCreate(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [membro_id, setMembro_id] = useState('');
  const [militantes, setMilitantes] = useState([]);

  async function saveUser(e) {
    e.preventDefault();
    const response = await api.post('/users', {
      username,
      password,
      membro_id,
      estado: 'Activo',
    });
    setUsername('');
    setPassword('');
    setMembro_id(null);
  }

  async function getMilitantes() {
    const response = await api.get('/militantes');

    militantes
      ? setMilitantes(response.data)
      : setMilitantes([...militantes, response.data]);
  }

  useEffect(() => {
    getMilitantes();
  }, []);
  return (
    <form>
      <h3>Criar utilizador</h3>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Militante</label>
            <select
              className="custom-select"
              onChange={(e) => setMembro_id(e.target.value)}
            >
              {militantes.map((value, key) => {
                return (
                  <option key={key} value={value.id}>
                    {value.nome}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Nome de utilizador</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nome de utilizador"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Palavra-passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="Palavra-passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Estado do utilizador</label>
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
        onClick={saveUser}
      >
        Criar
      </button>
    </form>
  );
}
export default UserCreate;
