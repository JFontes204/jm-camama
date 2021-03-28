import { Link } from 'react-router-dom';
import isAuthenticated from '../../services/auth';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './style.css';

const NavBarComponent = () => {
  const { definicoes: settings } = isAuthenticated();
  return (
    <Navbar className="navbar-light text-white" expand="sm">
      <div className="container">
        <Link className="navbar-brand text-link-img" to={'/home'}>
          MPLA SIIM
        </Link>
        <Navbar.Toggle aria-controls="collapsibleNavId" />
        <Navbar.Collapse id="collapsibleNavId">
          <Nav className="ml-auto mr-auto">
            <Nav.Item className="nav-link">
              <Link id="link-to-home" className="text-link-nav" to={'/home'}>
                Home
              </Link>
            </Nav.Item>
            {settings.comite.view ? (
              <Nav.Item className="nav-link">
                <Link className="nav-item text-link-nav" to={'/comite'}>
                  Comités
                </Link>
              </Nav.Item>
            ) : null}
            <Nav.Item className="nav-link">
              <Link className="nav-item text-link-nav" to={'/militante'}>
                Militantes
              </Link>
            </Nav.Item>
            {settings.nucleo.view ? (
              <Nav.Item className="nav-link">
                <Link className="nav-item text-link-nav" to={'/nucleo'}>
                  Núcleos
                </Link>
              </Nav.Item>
            ) : null}
            <Nav.Item className="nav-link">
              <Link className="nav-item text-link-nav" to={'/agenda'}>
                Agenda de actividades
              </Link>
            </Nav.Item>
            {settings.user.view ? (
              <Nav.Item className="nav-link">
                <Link className="nav-item text-link-nav" to={'/user'}>
                  Utilizadores
                </Link>
              </Nav.Item>
            ) : null}
            <Nav.Item className="nav-link">
              <Link className="nav-item text-link-nav" to={'/charts'}>
                Gráficos estatísticos
              </Link>
            </Nav.Item>
            <NavDropdown
              title={localStorage.getItem('name')}
              id="dropdown-in-nav"
            >
              <NavDropdown.Item href="/profile">
                Perfil do utilizdor
              </NavDropdown.Item>
              <NavDropdown.Item href="/comite-actual">
                Comité actual
              </NavDropdown.Item>
              {settings.setting.view ? (
                <NavDropdown.Item href="/settings">Definições</NavDropdown.Item>
              ) : null}
              <NavDropdown.Divider />
              <NavDropdown.Item href={'/goout'}>Sair</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};
export default NavBarComponent;
