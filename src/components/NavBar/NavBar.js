import {Navbar, Container, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CookieUtil from "../../CookieUtil/CookieUtil";

const NavBar = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const tokenTemp = CookieUtil.getCookie("access_token");
    if (token !== tokenTemp) {
        setToken(tokenTemp);
    }

    useEffect(() => {
        async function tryRefreshToken() {
            const refreshToken = CookieUtil.getCookie("refresh_token");
            console.log(refreshToken);
            await axios.post("http://localhost:8080/token/refresh", {}, {
                headers: {'Authorization': refreshToken}
            }).then((res) => {
                CookieUtil.setRefreshedToken(res.headers.authorization);
                setToken(res.headers.authorization);
            }).catch(err => setLoggedIn(false));
        }
        async function fetchProfileData() {
            await axios.get("http://localhost:8080/profile/details", {
                headers: {'Authorization': token}
            })
                .then(res => {setUser(res.data); setLoggedIn(true)})
                .catch(err => tryRefreshToken());
        }
        fetchProfileData();
    }, [token]);

    function logout() {
        document.cookie = "access_token=noToken;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
        document.cookie = "refresh_token=noToken;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
        document.location.replace("/");
    }

    function openAdminPage() {
        navigate("/admin/glowna");
    }

    return (
        <Navbar className="bg-navbar" style={{height: '9.6vh'}}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <Container>
                <Navbar.Brand href="/" className="brand-logo"><img alt={"logo"} src="/logo.png"
                    className="d-inline-block align-top"
                /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link href="#kontakt">Kontakt</Nav.Link>
                </Nav>
                </Navbar.Collapse>
                {user.roles?.includes("ADMIN") && loggedIn ?
                    <button type="button" className="btn btn-warning btn-admin" onClick={() => openAdminPage()}>Panel admina</button>
                    : ""}
                {!loggedIn ? <a href={"/logowanie"} type="button" className="btn btn-signin btn-outline-primary search-btn">Zaloguj się</a> :
                    <div className="btn-container">
                        <span className="name-header header-navbar">Witaj {user.username}</span>
                        <button type="button" className="btn btn-acc-cart btn-outline-primary" style={{margin: "0 1em"}} onClick={() => navigate("/koszyk")}>Koszyk</button>
                        <button type="button" className="btn btn-acc-logout btn-outline-danger" onClick={() => logout()}>Wyloguj</button>
                    </div>
                }
            </Container>
        </Navbar>
    );
}

export default NavBar;