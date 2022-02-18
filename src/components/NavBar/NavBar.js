import {Navbar, Container, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const NavBar = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const tokenTemp = decodeURI(document.cookie.split("=")[1]);
    if (token !== tokenTemp) {
        setToken(tokenTemp);
    }

    useEffect(() => {
        async function fetchProfileData() {
            await axios.get("http://localhost:8080/profile/details", {
                headers: {'Authorization': token}
            })
                .then(res => {setUser(res.data); setLoggedIn(true)})
                .catch(err => setLoggedIn(false));
        }
        fetchProfileData();
    }, [token]);

    function logout() {
        document.cookie = "token=noToken;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.location.replace("/");
    }

    return (
        <Navbar className="bg-navbar" style={{height: '9.6vh'}}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
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
                {!loggedIn ? <a href={"/logowanie"} type="button" className="btn btn-outline-primary search-btn">Zaloguj się</a> :
                    <div>
                        <span className="name-header">Witaj {user.username}</span>
                        <button type="button" className="btn btn-outline-primary" style={{margin: "0 1em"}} onClick={() => navigate("/koszyk")}>Koszyk</button>
                        <button type="button" className="btn btn-outline-danger" onClick={() => logout()}>Wyloguj</button>
                    </div>
                }
            </Container>
        </Navbar>
    );
}

export default NavBar;