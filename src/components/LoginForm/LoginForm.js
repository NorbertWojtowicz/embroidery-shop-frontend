import './LoginForm.css';
import React from "react";

const LoginForm = () => {
    return (
        <div className="wrapper fadeInDown login-form">
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
            <div id="formContent">

                <div className="fadeIn first login-header">
                    <i className="fa fa-user"/> Zaloguj się
                </div>

                <form>
                    <input type="text" id="login" className="fadeIn second" name="login" placeholder="Email"/>
                    <input type="password" id="password" className="fadeIn third" name="login" placeholder="Hasło"/>
                    <input type="submit" className="fadeIn fourth" value="Zaloguj"/>
                </form>

                {/*Forgot password not implemented yet*/}
                {/*<div id="formFooter">*/}
                {/*    <a className="underlineHover" href="#">Forgot Password?</a>*/}
                {/*</div>*/}

                <div id="formFooter">
                    Nie masz konta? <a className="underlineHover" href="#">Zarejestruj się</a>
                </div>

            </div>
        </div>
    )
}

export default LoginForm;