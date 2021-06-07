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
  const [comite, setComite] = useState({});
  const { comite_id } = useParams();

  useEffect(async () => {
    await getComiteById();
  }, []);

  async function getComiteById() {
    try {
      const response = await api.get(`/comites/${comite_id}`, {
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
        setComite(response.data[0]);
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

      {Object.keys(comite).length ? (
        <Card>
          <Card.Header as="h5">Secretariado: {comite.nome}</Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-lg-6 col-md-7 col-sm-12">
                <Card.Title>Comité nº: {comite.comite_numero}</Card.Title>
                <Card.Subtitle>
                  Tipo comité: {comite.tipo_comite}
                </Card.Subtitle>{' '}
                <br />
                <Card.Text>
                  <b>Morada:</b> {comite.localizacao}
                </Card.Text>
              </div>
              <div className="col-lg-6 col-md-3 col-sm-12">
                {comite.comite_pai_id ? (
                  <Card.Text>
                    <b>Comité tutelar:</b>{' '}
                    {JSON.parse(localStorage.getItem('comite')).comite_nome}
                  </Card.Text>
                ) : null}
                {comite.descricao ? (
                  <Card.Text>
                    <b>Mais info:</b> {comite.descricao}
                  </Card.Text>
                ) : null}
                <Card.Text>
                  <b>Estado:</b> {comite.estado}
                </Card.Text>
              </div>
            </div>
          </Card.Body>
          <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
            <span></span>
            <div>
              <Link to={`/comite`} className="btn btn-second">
                Voltar
              </Link>
              {settings.comite.edit ? (
                <Card.Link
                  href={`/comite-update/${comite_id}`}
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
