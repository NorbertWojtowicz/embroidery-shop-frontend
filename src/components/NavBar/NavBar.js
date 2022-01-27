import {Navbar, Container, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'

const NavBar = () => {
    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/"><img src="/logo.png"
                    className="d-inline-block align-top"
                /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="/produkty">Produkty</Nav.Link>
                    <Nav.Link href="/kontakt">Kontakt</Nav.Link>
                    <Nav.Link href="/regulamin">Regulamin</Nav.Link>
                    <Nav.Link href="/faq">FAQ</Nav.Link>
                </Nav>
                </Navbar.Collapse>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-primary search-btn" type="submit">Search</button>
                </form>
            </Container>
        </Navbar>
    );
}

export default NavBar;