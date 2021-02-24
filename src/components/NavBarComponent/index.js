import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './style.css';

const NavBarComponent = () => {
  return (
    <Navbar className="navbar-light text-white" expand="sm">
      <div className="container">
        <Link className="navbar-brand text-link-img" to={'/home'}>
          JMPLA SIIM
        </Link>

        <Navbar.Toggle aria-controls="collapsibleNavId" />
        <Navbar.Collapse id="collapsibleNavId">
          <Nav className="ml-auto mr-auto">
            <Nav.Link>
              <Link id="link-to-home" className="text-link-nav" to={'/home'}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-item text-link-nav" to={'/comite'}>
                Comités
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-item text-link-nav" to={'/militante'}>
                Militantes
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-item text-link-nav" to={'/nucleo'}>
                Núcleos
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-item text-link-nav" to={'/agenda'}>
                Agenda de actividades
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-item text-link-nav" to={'/user'}>
                Utilizadores
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-item text-link-nav" to={'/charts'}>
                Gráficos estatísticos
              </Link>
            </Nav.Link>
            <Nav.Link className="text-link-nav" href={'/'}>
              Sair
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};
export default NavBarComponent;
