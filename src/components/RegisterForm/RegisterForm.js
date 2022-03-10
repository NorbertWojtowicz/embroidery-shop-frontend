import React, { useState } from "react";
import FormError from "../ErrorContainers/FormError/FormError";
import axiosApiInstance from "../../Config/AxiosApiInstance";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function registerUser(e) {
    e.preventDefault();
    const registerForm = document.querySelector("#register-form");
    const newUser = {
      username: registerForm.login.value,
      email: registerForm.email.value,
      password: registerForm.password.value,
      passwordRepeat: registerForm.passwordRepeat.value,
    };
    if (validateUser(newUser)) {
      const { passwordRepeat, ...userDto } = newUser;
      await axiosApiInstance
        .post("http://localhost:8080/register", userDto)
        .then(() => setSuccess(true))
        .catch((err) => setError(err.response.data.message));
    }
  }

  function validateUser(newUser) {
    if (
      newUser.email.length === 0 ||
      newUser.password.length === 0 ||
      newUser.username.length === 0
    ) {
      setError("Żadne z pól nie może być puste");
      return false;
    } else if (newUser.email.length > 80) {
      setError("Adres email nie może być dłuższy niż 80 znaków");
      return false;
    } else if (newUser.email.username > 50) {
      setError("Nazwa użytkownika nie może być dłuższa niż 50 znaków");
      return false;
    } else if (
      !newUser.password.match(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ) {
      setError(
        "Hasło musi zawierac: [Co najmniej 8 znaków, co najmniej jedną małą oraz dużą literę, co najmniej jeden znak specjalny i liczbę]"
      );
      return false;
    } else if (newUser.password !== newUser.passwordRepeat) {
      setError("Hasła nie są takie same");
      return false;
    } else if (
      !newUser.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
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
          <i className="fa fa-user" /> Stwórz konto
        </div>

        <form id="register-form">
          <input
            type="text"
            id="email"
            className="fadeIn second"
            name="email"
            placeholder="Email"
          />
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Nazwa użytkownika"
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="Hasło"
          />
          <input
            type="password"
            id="passwordRepeat"
            className="fadeIn third"
            name="passwordRepeat"
            placeholder="Powtórz hasło"
          />
          <input
            type="submit"
            onClick={(e) => registerUser(e)}
            className="fadeIn fourth"
            value="Zarejestruj"
          />
        </form>

        {error.length !== 0 ? <FormError message={error} /> : ""}

        {success ? (
          <div
            className="alert alert-success"
            role="alert"
            style={{ width: "80%", margin: "0 auto 2em auto" }}
          >
            Zarejestrowano pomyślnie!{" "}
            <a className="underlineHover" href={"/logowanie"}>
              Zaloguj się
            </a>
          </div>
        ) : (
          ""
        )}

        <div id="formFooter">
          Masz już konto?{" "}
          <a className="underlineHover" href={"/logowanie"}>
            Zaloguj się
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
