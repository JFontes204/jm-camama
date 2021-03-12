import {
  Modal,
  Toast,
  Tabs,
  Tab,
  Row,
  Col,
  Nav,
  Accordion,
  Card,
  Button,
} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import api from '../../services/Api';
import Loading from '../Loading';
import ListItems from './listItems';
import './style.css';

function Settings() {
  const [modalShow, setModalShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastClasses, setToastClasses] = useState('');
  const [settingKey, setSettingKey] = useState('home');
  const [data, setData] = useState([]);

  function handleClose() {
    setModalShow(false);
    setToastMsg('Alterações canceladas!');
    setToastClasses('bg-warning text-white');
    setToastShow(true);
  }

  async function handleItems(key) {
    setSettingKey(key);
    try {
      const response = await api.get(`/${key}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).access_token
          }`,
        },
      });
      if (response.data) {
        setData(response.data);
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
      <h3>Definições do Sistema</h3>
      <Tabs
        id="controlled-tab-example"
        activeKey={settingKey}
        onSelect={(k) => handleItems(k)}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <Tab eventKey="direccao" title="Direcções" className="pt-3">
          <Tab.Container id="left-tabs-example" defaultActiveKey="lista">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="lista">Listar direcções</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="nova">Nova direcção</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="associar">Associar</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="lista">
                    <Loading myRender={() => <ListItems data={data} />} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="nova">Nova</Tab.Pane>
                  <Tab.Pane eventKey="associar">Associar</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Tab>
        <Tab eventKey="funcao" title="Funções ou cargos" className="pt-3">
          <Tab.Container id="left-tabs-example" defaultActiveKey="listar">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="listar"> Listar funções</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="nova">Nova função</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="associar">Associar</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="listar">
                    <Loading myRender={() => <ListItems data={data} />} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="nova">
                    Criação de nova função ou cargo.
                  </Tab.Pane>
                  <Tab.Pane eventKey="associar">
                    Associar função à direcção ou à militante
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Tab>
        <Tab eventKey="exemplo" title="Exemplo" className="pt-3">
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Listar funções
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Loading myRender={() => <ListItems data={[]} />} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Nova função
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>Criação de nova função ou cargo.</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Associar função
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>Associar função à direcção ou à militante</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Tab>
      </Tabs>

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
          <button
            className="btn btn-master"
            onClick={() => setModalShow(false)}
          >
            Confirmar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Settings;
