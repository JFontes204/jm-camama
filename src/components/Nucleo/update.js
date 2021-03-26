import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Modal, Toast } from 'react-bootstrap';
import api from '../../services/Api';

function NucleoUpdate() {
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastClasses, setToastClasses] = useState('');
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [descricao, setDescricao] = useState('');
  const [estado, setEstado] = useState('');
  const { nucleo_id } = useParams();

  useEffect(() => {
    getNucleoById(nucleo_id);
  }, []);

  async function getNucleoById(nucleo_id) {
    try {
      const response = await api.get(`/nucleos/${nucleo_id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).access_token
          }`,
        },
      });
      const [res] = response.data;
      setNome(res.nome);
      setSigla(res.sigla);
      setEstado(res.estado);
      if (res.descricao === null) {
        setDescricao('');
      } else {
        setDescricao(res.descricao);
      }
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    }
  }

  async function updateNucleo() {
    setModalShow(false);
    try {
      const response = await api.put(
        `/nucleos/${nucleo_id}`,
        {
          nome,
          sigla,
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
      if (Object.keys(response.data).length) {
        setNome('');
        setSigla('');
        setEstado('');
        setDescricao('');
        setToastMsg('Alterado com sucesso!');
        setToastClasses('text-dark');
        setToastShow(true);
        setTimeout(() => (window.location.href = '/nucleo'), 2000);
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
            <Link className="text-link text-link-view" to={'/nucleo'}>
              <button className="btn btn-second mb-1">Voltar</button>
            </Link>
          </div>
          <h3 className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
            Actualização de dados da actividade
          </h3>
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
              <label>Estado do núcleo</label>
              <select
                onChange={(e) => setEstado(e.target.value)}
                className="custom-select"
              >
                <option value="0">Escolhe um estado</option>
                <option value="Activo">Activo</option>
                <option value="Suspenso">Suspenso</option>
                <option value="Fechado">Fechado</option>
                <option value="Por abrir">Por abrir</option>
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
          <button className="btn btn-master" onClick={updateNucleo}>
            Confirmar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NucleoUpdate;
