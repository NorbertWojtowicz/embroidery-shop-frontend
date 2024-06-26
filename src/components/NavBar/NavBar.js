import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CookieUtil from "../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../Config/AxiosApiInstance";
import API_URL from "../../Config/API_URL";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const token = CookieUtil.getCookie("access_token");

  useEffect(() => {
    setLoaded(false);
    document.title = "Dziecięcy atelier";
    async function fetchProfileData() {
      await axiosApiInstance
        .get(API_URL + "/profile/details", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setUser(res.data);
          setLoggedIn(true);
        })
        .catch((err) => setLoggedIn(false));
      setLoaded(true);
    }
    fetchProfileData();
  }, [token]);

  function logout() {
    document.cookie =
      "access_token=noToken;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie =
      "refresh_token=noToken;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.location.replace("/");
  }

  function openAdminPage() {
    navigate("/admin/glowna");
  }

  return (
    <Navbar className="bg-navbar" style={{ height: "9.6vh" }}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <Container>
        <Navbar.Brand href="/" className="brand-logo">
          <img
            alt={"logo"}
            src="/logo.png"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="#kontakt">Kontakt</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {user.roles?.includes("ADMIN") && loggedIn ? (
          <button
            type="button"
            className="btn btn-warning btn-admin"
            onClick={() => openAdminPage()}
          >
            Panel admina
          </button>
        ) : (
          ""
        )}
        {!isLoaded ? (
          <LoadingSpinner />
        ) : !loggedIn ? (
          <a
            href={"/logowanie"}
            type="button"
            className="btn btn-signin btn-outline-primary search-btn"
          >
            Zaloguj się
          </a>
        ) : (
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-acc-orders btn-outline-secondary"
              onClick={() => (window.location.href = "/zamowienia")}
            >
              Zamówienia
            </button>
            <button
              type="button"
              className="btn btn-acc-cart btn-outline-primary"
              style={{ margin: "0 1em" }}
              onClick={() => (window.location.href = "/koszyk")}
            >
              Koszyk
            </button>
            <button
              type="button"
              className="btn btn-acc-logout btn-outline-danger"
              onClick={() => logout()}
            >
              Wyloguj
            </button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
