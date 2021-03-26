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
  const [nomeSelected, setNomeSelected] = useState('');
  const [siglaSelected, setSiglaSelected] = useState('');
  const [descricaoSelected, setDescricaoSelected] = useState('');
  const [comite_id, setComite_id] = useState(0);

  useEffect(() => {
    getDepartamentos();
    getComites();
    getCargos();
  }, []);

  async function showModal(id) {
    if (settingKey === 'direccao') {
      const response = await getDepartamentos(id);
      setIdGeral(btoa(response.id));
      setNomeGeral(response.nome);
      setSiglaGeral(response.sigla);
      setDescricaoGeral(response.descricao);
    } else if (settingKey === 'funcao') {
      const response = await getCargos(id);
      setIdGeral(btoa(response.id));
      setNomeGeral(response.nome);
      setSiglaGeral(response.sigla);
      setDescricaoGeral(response.descricao);
    }
    setModalShow(true);
  }

  async function create(e) {
    e.preventDefault();
    try {
      const response = await api.post(
        `/${settingKey}`,
        {
          nome: settingKey === 'direccao' ? nomeDireccao : nomeFuncao,
          sigla: settingKey === 'direccao' ? siglaDireccao : siglaFuncao,
          descricao:
            settingKey === 'direccao' ? descricaoDireccao : descricaoFuncao,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('token')).access_token
            }`,
          },
        }
      );
      if (response.status === 200) {
        settingKey === 'direccao' ? setNomeDireccao('') : setNomeFuncao('');
        settingKey === 'direccao' ? setSiglaDireccao('') : setSiglaFuncao('');
        settingKey === 'direccao'
          ? setDescricaoDireccao('')
          : setDescricaoFuncao('');
        setToastMsg('Criado com sucesso!');
        setToastClasses('text-dark');
        setToastShow(true);
        setTimeout(() => (window.location.href = '/settings'), 2000);
      } else {
        setToastMsg('Falha na criação!');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    } catch (err) {
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
      } else {
        setToastMsg('Falha na criação!');
      }
      setToastClasses('bg-warning text-white');
      setToastShow(true);
    }
  }

  async function update() {
    try {
      const response = await api.put(
        `/${settingKey}/${idGeral}`,
        {
          nome: nomeGeral,
          sigla: siglaGeral,
          descricao: descricaoGeral,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('token')).access_token
            }`,
          },
        }
      );
      setModalShow(false);
      if (response.status === 200) {
        setIdGeral('');
        setNomeGeral('');
        setSiglaGeral('');
        setDescricaoGeral('');
        setToastMsg(response.data);
        setToastClasses('text-dark');
        setToastShow(true);
        setTimeout(() => (window.location.href = '/settings'), 2000);
      } else {
        setToastMsg('Falha ao fazer as alterações!');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    } catch (err) {
      setModalShow(false);
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
      } else {
        setToastMsg('Falha ao fazer as alterações!');
      }
      setToastClasses('bg-warning text-white');
      setToastShow(true);
    }
  }

  async function associete(e) {
    e.preventDefault();
    try {
      const path =
        settingKey === 'direccao'
          ? `/comites/${comite_id}/direccao`
          : `/direccao/${departamento_id}/funcao`;
      const data = {
        nome: nomeSelected,
        sigla: siglaSelected,
        descricao: descricaoSelected,
      };
      const response = await api.post(path, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('token')).access_token
          }`,
        },
      });
      if (response.status === 200) {
        setNomeSelected('');
        setSiglaSelected('');
        setDescricaoSelected('');
        setToastMsg('Alterado com sucesso!');
        setToastClasses('text-dark');
        setToastShow(true);
        setTimeout(() => (window.location.href = '/settings'), 2000);
      } else {
        setToastMsg('Falha ao fazer as alterações!');
        setToastClasses('bg-warning text-white');
        setToastShow(true);
      }
    } catch (err) {
      setModalShow(false);
      if (/status code 401$/i.test(err)) {
        setToastMsg('A sessão expirou! Sai e volte a entrar.');
      } else {
        setToastMsg('Falha ao fazer as alterações!');
      }
      setToastClasses('bg-warning text-white');
      setToastShow(true);
    }
  }

  async function getDepartamentos(id) {
    let path = `/direccao`;
    if (id !== undefined) {
      path = `/direccao/${id}`;
    }
    try {
      const response = await api.get(path, {
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
      if (response.status === 200 && id === undefined) {
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
    let path = `/funcao`;
    if (id !== undefined) {
      path = `/funcao/${id}`;
    }
    try {
      const response = await api.get(path, {
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
      if (response.status === 200 && id === undefined) {
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

  async function changeHire(id) {
    let response;
    if (settingKey === 'direccao') {
      setDepartamento_id(btoa(id));
      response = await getDepartamentos(btoa(id));
    } else if (settingKey === 'funcao') {
      setCargo_id(btoa(id));
      response = await getCargos(btoa(id));
    }
    setNomeSelected(response.nome);
    setSiglaSelected(response.sigla);
    setDescricaoSelected(response.descricao);
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
        /* unmountOnExit={true} */
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
                        onClick={create}
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
                              onChange={(e) =>
                                setComite_id(btoa(e.target.value))
                              }
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
                                changeHire(e.target.value);
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
                          onClick={associete}
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
                        onClick={create}
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
                                setDepartamento_id(btoa(e.target.value));
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
                              onChange={(e) => changeHire(e.target.value)}
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
                          onClick={associete}
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
                    onChange={(e) => setNomeGeral(e.target.value)}
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
                    onChange={(e) => setSiglaGeral(e.target.value)}
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
                    onChange={(e) => setDescricaoGeral(e.target.value)}
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
          <button className="btn btn-master" onClick={update}>
            Alterar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Settings;
