import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Modal, Toast } from 'react-bootstrap';
import api from '../../services/Api';

function AgendaUpdate() {
  const [modalShow, setModalShow] = useState(false);
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
  const { agenda_id } = useParams();

  useEffect(() => {
    getAgendaById(agenda_id);
  }, []);

  async function getAgendaById(agenda_id) {
    try {
      const response = await api.get(`/agenda/${agenda_id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).access_token
          }`,
        },
      });
      const [res] = response.data;
      setNome_actividade(res.nome_actividade);
      setLocal(res.local);
      setConvidados(res.convidados);
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

  async function updateAgenda() {
    setModalShow(false);
    try {
      const response = await api.put(
        `/agenda/${agenda_id}`,
        {
          nome_actividade,
          local,
          convidados,
          data_e_hora: data + 'T' + hora + ':00.698Z',
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
        setNome_actividade('');
        setLocal('');
        setDescricao('');
        setData('');
        setHora('');
        setEstado('');
        setConvidados('');
        setToastMsg('Alterado com sucesso!');
        setToastClasses('text-dark');
        setToastShow(true);
        setTimeout(() => (window.location.href = '/agenda'), 2500);
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
            <Link className="text-link text-link-view" to={'/agenda'}>
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
          <button className="btn btn-master" onClick={updateAgenda}>
            Confirmar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AgendaUpdate;
