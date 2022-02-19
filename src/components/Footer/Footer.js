import './Footer.css';
import React from "react";

const Footer = () => {
    return (
            <footer style={{marginTop: "15em"}}>
                <div className="footer-top">
                    <div className="footer-left-top">
                        <a href={"/"}><img src="/logo-white.png" alt="Logo"/></a>
                    </div>
                    <div className="footer-right-top">
                        <h2 id="kontakt">Kontakt</h2>
                        <p><i className="fa fa-envelope"/> agnieszkawojtowicz02@wp.pl<br/></p>
                        <p><i className="fa fa-phone"/> 575 006 475<br/></p>
                        <p><a href="https://www.facebook.com/agnieszka.wojtowicz.7186"><i className="fa fa-facebook"/> Agnieszka Wojtowicz</a><br/></p>
                        <p><a href="https://www.facebook.com/groups/515070159523737/"><i className="fa fa-facebook"/> Grupa: Aga szyje i haftuje</a></p>
                    </div>
                </div>
                <br/>
                <div className="footer-divide-line"/>
                <div className="footer-bottom">
                    Copyright &copy; 2022 <a href="https://github.com/MokrySzczupak">Norbert Wojtowicz</a>. All Rights Reserved
                </div>
            </footer>
    )
}

export default Footer;