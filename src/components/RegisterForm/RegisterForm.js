import React from "react";

const RegisterForm = () => {
    return (
        <div className="wrapper fadeInDown login-form">
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
            <div id="formContent">
                <div className="fadeIn first login-header">
                    <i className="fa fa-user"/> Stwórz konto
                </div>

                <form>
                    <input type="text" id="email" className="fadeIn second" name="email" placeholder="Email"/>
                    <input type="text" id="login" className="fadeIn second" name="login" placeholder="Nazwa użytkownika"/>
                    <input type="password" id="password" className="fadeIn third" name="password" placeholder="Hasło"/>
                    <input type="password" id="password-repeat" className="fadeIn third" name="password-repeat" placeholder="Powtórz hasło"/>
                    <input type="submit" className="fadeIn fourth" value="Zarejestruj"/>
                </form>

                <div id="formFooter">
                    Masz już konto? <a className="underlineHover" href={"/logowanie"}>Zaloguj się</a>
                </div>

            </div>
        </div>
    )
}

export default RegisterForm;