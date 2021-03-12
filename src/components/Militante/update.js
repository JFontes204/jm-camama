import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Modal, Toast } from 'react-bootstrap';
import api from '../../services/Api';

function MilitanteUpdate() {
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastClasses, setToastClasses] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [morada, setMorada] = useState('');
  const [telefone1, setTelefone1] = useState('');
  const [telefone2, setTelefone2] = useState('');
  const [data_nascimento, setData_nascimento] = useState('');
  const [ano_inicio_militancia, setAno_inicio_militancia] = useState('');
  const [grupo_eleitoral_numero, setGrupo_eleitoral_numero] = useState('');
  const [cartao_eleitoral_numero, setCartao_eleitoral_numero] = useState('');
  const [comite_id, setComite_id] = useState(0);
  const [comites, setComites] = useState([]);
  const [estado, setEstado] = useState('');
  const { militante_id } = useParams();

  useEffect(() => {
    getComites();
    getMilitanteById(militante_id);
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

  async function getMilitanteById(militante_id) {
    try {
      const response = await api.get(`/militantes/${militante_id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).access_token
          }`,
        },
      });
      const [res] = response.data;
      setNome(res.nome);
      setEmail(res.email);
      setEstado(res.estado);
      setMorada(res.morada);
      setTelefone1(res.telefone1);
      setTelefone2(res.telefone2);
      setData_nascimento(res.data_nascimento);
      setAno_inicio_militancia(res.ano_inicio_militancia);
      setComite_id(res.comite_id);
      setGrupo_eleitoral_numero(res.grupo_eleitoral_numero);
      setCartao_eleitoral_numero(res.cartao_eleitoral_numero);
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    }
  }

  async function updateMilitante() {
    setModalShow(false);
    try {
      const response = await api.put(
        `/militantes/${militante_id}`,
        {
          nome,
          email,
          morada,
          telefone1,
          telefone2: telefone2 === '' ? null : telefone2,
          data_nascimento,
          ano_inicio_militancia,
          comite_id,
          estado,
          grupo_eleitoral_numero,
          cartao_eleitoral_numero,
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
        setEmail('');
        setMorada('');
        setTelefone1('');
        setTelefone2('');
        setData_nascimento('');
        setAno_inicio_militancia('');
        setComite_id(0);
        setGrupo_eleitoral_numero('');
        setCartao_eleitoral_numero('');
        setEstado('');
        setToastMsg('Alterado com sucesso!');
        setToastClasses('text-dark');
        setToastShow(true);
        setTimeout(() => (window.location.href = '/militante'), 2000);
      } else {
        setToastMsg('Falha ao fazer as alterações!');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
      } else {
        setToastMsg('Falha ao fazer as alterações!');
      }
      setToastClasses('bg-warning text-white');
      setToastShow(true);
    }
  }

  function handleClose() {
    setModalShow(false);
    setToastMsg('Alterações canceladas!');
    setToastClasses('bg-warning text-white');
    setToastShow(true);
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
            <Link className="text-link text-link-view" to={'/militante'}>
              <button className="btn btn-second mb-1">Voltar</button>
            </Link>
          </div>
          <h3 className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
            Actualização de dados do militante
          </h3>
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
              <label>Estado do militante</label>
              <select
                onChange={(e) => setEstado(e.target.value)}
                className="custom-select"
              >
                <option value="0">Escolhe um estado</option>
                <option value="Activo">Activo</option>
                <option value="Suspenso">Suspenso</option>
                <option value="Em analise">Em analise</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="form-group">
              <label>Morada</label>

              <textarea
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
          onClick={(e) => {
            e.preventDefault();
            setModalShow(true);
          }}
        >
          Actualizar
        </button>
      </form>
      <Modal
        show={modalShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Alerta - SIIM</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          Tem certeza que deseja realizar as alterações?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-second" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn btn-master" onClick={updateMilitante}>
            Confirmar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MilitanteUpdate;
