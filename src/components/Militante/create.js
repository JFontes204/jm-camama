import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import api from '../../services/Api';

function User() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [morada, setMorada] = useState('');
  const [telefone1, setTelefone1] = useState('');
  const [telefone2, setTelefone2] = useState('');
  const [data_nascimento, setData_nascimento] = useState('');
  const [ano_inicio_militancia, setAno_inicio_militancia] = useState('');
  const [grupo_eleitoral_numero, setGrupo_eleitoral_numero] = useState(0);
  const [cartao_eleitoral_numero, setCartao_eleitoral_numero] = useState(0);
  const [comite_id, setComite_id] = useState(0);
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
  async function getComites() {
    const response = await api.get('/comites/all=*', config);
    comites
      ? setComites(response.data)
      : setComites([...comites, response.data]);
  }
  async function saveMilitante(e) {
    e.preventDefault();
    const response = await api.post(
      '/militantes',
      {
        nome,
        email,
        morada,
        telefone1,
        telefone2: telefone2 === '' ? null : telefone2,
        data_nascimento,
        ano_inicio_militancia,
        comite_id,
        estado: 'Activo',
        grupo_eleitoral_numero,
        cartao_eleitoral_numero,
      },
      config
    );
    if (Object.keys(response.data).length > 0) {
      setNome('');
      setEmail('');
      setMorada('');
      setTelefone1('');
      setTelefone2('');
      setData_nascimento('');
      setAno_inicio_militancia('');
      setComite_id(0);
      setGrupo_eleitoral_numero('');
      setCartao_eleitoral_numero('');
      window.location.href = '/militante';
    }
  }

  return (
    <form>
      <div className="row content-header">
        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
          <Link className="text-link text-link-view" to={'/militante'}>
            <button className="btn btn-second mb-1">Voltar</button>
          </Link>
        </div>
        <h1 className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
          Criar novo Militante
        </h1>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nome do militante"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
            <label>Telefone 1</label>
            <input
              type="text"
              className="form-control"
              placeholder="Telefone 1"
              maxLength="9"
              value={telefone1}
              onChange={(e) => setTelefone1(e.target.value)}
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Telefone 2</label>
            <input
              type="text"
              className="form-control"
              placeholder="Telefone 2"
              maxLength="9"
              value={telefone2}
              onChange={(e) => setTelefone2(e.target.value)}
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Data de Nascimento</label>
            <input
              type="text"
              className="form-control"
              placeholder="2021-02-01"
              value={data_nascimento}
              onChange={(e) => setData_nascimento(e.target.value)}
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Data de Ingresso</label>
            <input
              type="text"
              className="form-control"
              placeholder="1954"
              value={ano_inicio_militancia}
              onChange={(e) => setAno_inicio_militancia(e.target.value)}
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Cartão Eleitoral nº</label>
            <input
              type="text"
              className="form-control"
              placeholder="Cartão Eleitoral nº"
              value={cartao_eleitoral_numero}
              onChange={(e) => setCartao_eleitoral_numero(e.target.value)}
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Grupo Eleitoral nº</label>
            <input
              type="text"
              className="form-control"
              placeholder="Grupo Eleitoral nº"
              value={grupo_eleitoral_numero}
              onChange={(e) => setGrupo_eleitoral_numero(e.target.value)}
            />
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="text"
              className="form-control"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="form-group">
            <label>Morada</label>
            <input
              type="text"
              className="form-control"
              placeholder="Morada"
              value={morada}
              onChange={(e) => setMorada(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        className="btn btn-master btn-lg btn-block"
        onClick={saveMilitante}
      >
        Criar
      </button>
    </form>
  );
}

export default User;
