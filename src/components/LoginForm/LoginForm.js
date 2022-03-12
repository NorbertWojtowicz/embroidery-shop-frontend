import "./LoginForm.css";
import React, { useState } from "react";
import FormError from "../ErrorContainers/FormError/FormError";
import axiosApiInstance from "../../Config/AxiosApiInstance";
import API_URL from "../../Config/API_URL";

const LoginForm = () => {
  const [error, setError] = useState("");

  async function login(e) {
    e.preventDefault();
    const loginForm = document.querySelector("#login-form");
    const user = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    };
    if (validateUser(user)) {
      await axiosApiInstance
        .post(API_URL + "/login", user)
        .then((res) => setTokenAndNavigateToHome(res.headers.authorization))
        .catch((err) => {
          const error = err.response.data.message;
          setError(error === undefined ? `Sprawdź dane jeszcze raz...` : error);
        });
    }
  }

  function setTokenAndNavigateToHome(token) {
    const cookieExpire = new Date();
    const cookieExpireRefresh = new Date();
    // [0] = access token, [1] = refresh_token
    const tokens = token.split("refresh_token");
    cookieExpire.setTime(Date.now() + 3600000 * 24 * 7);
    cookieExpireRefresh.setTime(Date.now() + 200 * 24 * 60 * 60 * 1000);
    document.cookie = `access_token=${encodeURI(
      tokens[0]
    )};expires=${cookieExpire.toGMTString()}`;
    document.cookie = `refresh_token=${encodeURI(
      tokens[1]
    )};expires=${cookieExpireRefresh.toGMTString()}`;
    document.location.replace("/");
  }

  function validateUser(user) {
    if (user.email.length === 0 || user.password.length === 0) {
      setError("Żadne z pól nie może być puste");
      return false;
    } else if (user.email.length > 80) {
      setError("Adres email nie może być dłuższy niż 80 znaków");
      return false;
    } else if (
      !user.password.match(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ) {
      setError(
        "Hasło musi zawierac: [Co najmniej 8 znaków, co najmniej jedną małą oraz dużą literę, co najmniej jeden znak specjalny i liczbę]"
      );
      return false;
    } else if (
      !user.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      setError("Niepoprawny adres email");
      return false;
    }
    setError("");
    return true;
  }

  return (
    <div className="wrapper fadeInDown login-form">
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div id="formContent">
        <div className="fadeIn first login-header">
          <i className="fa fa-user" /> Zaloguj się
        </div>

        <form id="login-form">
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="email"
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="Hasło"
          />
          <input
            type="submit"
            onClick={(e) => login(e)}
            className="fadeIn fourth"
            value="Zaloguj"
          />
        </form>

        {/*Forgot password not implemented yet*/}
        {/*<div id="formFooter">*/}
        {/*    <a className="underlineHover" href="#">Forgot Password?</a>*/}
        {/*</div>*/}

        {error.length !== 0 ? <FormError message={error} /> : ""}

        <div id="formFooter">
          Nie masz konta?{" "}
          <a className="underlineHover" href={"/rejestracja"}>
            Zarejestruj się
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
