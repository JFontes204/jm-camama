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
  const [nomeDireccao, setNomeDireccao] = useState('');
  const [siglaDireccao, setSiglaDireccao] = useState('');
  const [descricaoDireccao, setDescricaoDireccao] = useState('');
  const [nomeFuncao, setNomeFuncao] = useState('');
  const [siglaFuncao, setSiglaFuncao] = useState('');
  const [descricaoFuncao, setDescricaoFuncao] = useState('');
  const [departamentos, setDepartamentos] = useState([]);
  const [departamento_id, setDepartamento_id] = useState(0);
  const [cargos, setCargos] = useState([]);
  const [cargo_id, setCargo_id] = useState(0);
  const [comites, setComites] = useState([]);
  const [idGeral, setIdGeral] = useState('');
  const [nomeGeral, setNomeGeral] = useState('');
  const [siglaGeral, setSiglaGeral] = useState('');
  const [descricaoGeral, setDescricaoGeral] = useState('');
  const [comite_id, setComite_id] = useState(0);

  useEffect(() => {
    getDepartamentos();
    getComites();
    getCargos();
  }, []);

  async function showModal(id) {
    if (settingKey === 'direccao') {
      const r = await getDepartamentos(id);
      setIdGeral(btoa(r.id));
      setNomeGeral(r.nome);
      setSiglaGeral(r.sigla);
      setDescricaoGeral(r.descricao);
    } else if (settingKey === 'funcao') {
      const r = await getCargos(id);
      setIdGeral(btoa(r.id));
      setNomeGeral(r.nome);
      setSiglaGeral(r.sigla);
      setDescricaoGeral(r.descricao);
    }
    setModalShow(true);
  }

  async function getDepartamentos(id) {
    if (id === undefined) {
      id = '';
    }
    try {
      const response = await api.get(`/direccao/${id}`, {
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
      if (Object.keys(response.data).length && id === '') {
        setDepartamentos(response.data);
      } else {
        return response.data[0];
      }
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    }
  }

  async function getCargos(id) {
    if (id === undefined) {
      id = '';
    }
    try {
      const response = await api.get(`/funcao`, {
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
      if (Object.keys(response.data).length && id === '') {
        setCargos(response.data);
      } else {
        return response.data[0];
      }
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    }
  }

  async function getComites() {
    try {
      const response = await api.get('/comites/all/any', {
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
      if (Object.keys(response.data).length) {
        setComites(response.data);
      }
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    }
  }

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
                    <Loading
                      myRender={() => (
                        <ListItems data={data} showModal={showModal} />
                      )}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="nova">
                    <form>
                      <h3>Nova direcção ou departamento</h3>
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Nome da direcção</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Nome da direcção"
                              value={nomeDireccao}
                              onChange={(e) => setNomeDireccao(e.target.value)}
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
                              value={siglaDireccao}
                              onChange={(e) => setSiglaDireccao(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Descrição</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Descrição"
                              value={descricaoDireccao}
                              onChange={(e) =>
                                setDescricaoDireccao(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-master btn-lg btn-block"
                        onClick={() => {}}
                      >
                        Criar
                      </button>
                    </form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="associar">
                    <form>
                      <h3>Associar direcção ao comité</h3>
                      <div className="row">
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
                            <label>Direcção</label>
                            <select
                              className="custom-select"
                              onChange={(e) => {
                                setDepartamento_id(e.target.value);
                              }}
                            >
                              <option value="-1">Escolhe uma direcção</option>
                              {departamentos.map((value, key) => {
                                return (
                                  <option key={key} value={value.id}>
                                    {value.nome}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-master btn-lg btn-block"
                          onClick={() => {}}
                        >
                          Associar
                        </button>
                      </div>
                    </form>
                  </Tab.Pane>
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
                    <Loading
                      myRender={() => (
                        <ListItems data={data} showModal={showModal} />
                      )}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="nova">
                    <form>
                      <h3>Nova função ou cargo</h3>
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Nome da função</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Nome da função"
                              value={nomeFuncao}
                              onChange={(e) => setNomeFuncao(e.target.value)}
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
                              value={siglaFuncao}
                              onChange={(e) => setSiglaFuncao(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Descrição</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Descrição"
                              value={descricaoFuncao}
                              onChange={(e) =>
                                setDescricaoFuncao(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-master btn-lg btn-block"
                        onClick={() => {}}
                      >
                        Criar
                      </button>
                    </form>
                  </Tab.Pane>
                  <Tab.Pane eventKey="associar">
                    <form>
                      <h3>Associar função à direcção</h3>
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label>Direcção</label>
                            <select
                              className="custom-select"
                              onChange={(e) => {
                                setDepartamento_id(e.target.value);
                              }}
                            >
                              <option value="-1">Escolhe uma direcção</option>
                              {departamentos.map((value, key) => {
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
                            <label>Função</label>
                            <select
                              className="custom-select"
                              onChange={(e) => setCargo_id(e.target.value)}
                            >
                              <option value="-1">Escolhe uma função</option>
                              {cargos.map((value, key) => {
                                return (
                                  <option key={key} value={value.id}>
                                    {value.nome}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-master btn-lg btn-block"
                          onClick={() => {}}
                        >
                          Associar
                        </button>
                      </div>
                    </form>
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
                <Card.Body>exemplo</Card.Body>
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
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Alerta - SIIM</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <form>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nome da direcção"
                    value={nomeGeral}
                    onChange={(e) => setNomeDireccao(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Sigla</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Sigla"
                    value={siglaGeral}
                    onChange={(e) => setSiglaDireccao(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Descrição</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Descrição"
                    value={descricaoGeral}
                    onChange={(e) => setDescricaoDireccao(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-second" onClick={handleClose}>
            Cancelar
          </button>
          <button
            className="btn btn-master"
            onClick={() => setModalShow(false)}
          >
            Alterar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Settings;
