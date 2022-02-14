import {Navbar, Container, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'

const NavBar = () => {

    function searchForProduct(e) {
        e.preventDefault();
        const inputValue = document.querySelector(".search-input").value;
        document.querySelector(".search-bar-input").value = inputValue;
        document.location.href = "#szukaj";
        document.querySelector("#search-btn-id").click();
    }

    return (
        <Navbar bg="light" style={{height: '9.6vh'}}>
            <Container>
                <Navbar.Brand href="/"><img alt={"logo"} src="/logo.png"
                    className="d-inline-block align-top"
                /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="#produkty">Produkty</Nav.Link>
                    <Nav.Link href="#kontakt">Kontakt</Nav.Link>
                    {/*<Nav.Link href="/regulamin">Regulamin</Nav.Link>*/}
                    {/*<Nav.Link href="/faq">FAQ</Nav.Link>*/}
                </Nav>
                </Navbar.Collapse>
                <form className="d-flex">
                    <input className="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-primary search-btn" type="submit" onClick={(e) => searchForProduct(e)}>Search</button>
                </form>
            </Container>
        </Navbar>
    );
}

export default NavBar;