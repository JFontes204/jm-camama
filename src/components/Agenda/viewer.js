import React, { useState, useEffect } from 'react';
import dataFormate from '../../utils/dataFormate';
import { Toast, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../../services/Api';

export default function Viewer({ settings }) {
  const [toastShow, setToastShow] = useState(false);
  const [toastClasses, setToastClasses] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [agenda, setAgenda] = useState({});
  const [comiteNome, setComiteNome] = useState({});
  const { agenda_id } = useParams();

  useEffect(() => {
    getAgendaById();
  }, []);

  async function getAgendaById() {
    try {
      const response = await api.get(`/agenda/${agenda_id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).access_token
          }`,
        },
      });
      const { status, error } = response.data;
      if (status !== undefined && !JSON.parse(status)) {
        localStorage.clear();
        setToastMsg(error);
        setToastClasses('bg-warning text-white');
        setToastShow(true);
        setTimeout(() => (window.location.href = '/goout'), 2800);
        return;
      }
      if (response.status === 200) {
        const [res] = response.data;
        const { comites: comite } = res;
        setComiteNome(comite.nome);
        setAgenda(res);
      }
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
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

      {Object.keys(agenda).length ? (
        <Card>
          <Card.Header as="h5">
            Actividade: {agenda.nome_actividade}
          </Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-lg-6 col-md-7 col-sm-12">
                <Card.Title>Convidados: {agenda.convidados}</Card.Title>
                <Card.Subtitle>Local: {agenda.local}</Card.Subtitle> <br />
                <Card.Text>
                  <b>Data & hora:</b> {dataFormate(agenda.data_e_hora)}
                </Card.Text>
              </div>
              <div className="col-lg-6 col-md-3 col-sm-12">
                <Card.Text>
                  <b>Secretariado:</b> {comiteNome}
                </Card.Text>
                {agenda.descricao ? (
                  <Card.Text>
                    <b>Mais info:</b> {agenda.descricao}
                  </Card.Text>
                ) : null}
                <Card.Text>
                  <b>Estado:</b> {agenda.estado}
                </Card.Text>
              </div>
            </div>
          </Card.Body>
          <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
            <span>
              <b>Criada em:</b> {dataFormate(agenda.createdAt).split(' ')[0]}
            </span>
            <div>
              <Link to={`/agenda`} className="btn btn-second">
                Voltar
              </Link>
              {settings.agenda.edit ? (
                <Card.Link
                  href={`/agenda-update/${agenda_id}`}
                  className="btn btn-master ml-1"
                >
                  Editar
                </Card.Link>
              ) : null}
            </div>
          </Card.Footer>
        </Card>
      ) : null}
    </>
  );
}
