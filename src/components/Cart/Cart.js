import './Cart.css';
import {useState} from "react";
import axios from "axios";

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const token = decodeURI(document.cookie.split("=")[1]);
    useState(() => {
        async function fetchData() {
            await axios.get("http://localhost:8080/cart", {headers: {
                "Authorization": token
                }
            }).then(res => setCartItems(res.data)).catch();
        }
        fetchData();
    }, []);
    console.log(cartItems.length);
    console.log(cartItems);
    return (
        <div>
            {cartItems.length === 0 ?
                <div className="alert alert-danger alert-cart" role="alert" style={{marginBottom: "30em"}}>
                    {token !== "undefined" ? "Koszyk jest pusty" : "Nie jesteś zalogowany"}
                </div>
                :
                <div>
                <div className="alert alert-danger alert-cart" role="alert">
                    Po zatwierdzeniu zamówienia proszę o <a href={"/kontakt"}>kontakt (tutaj)</a> w celu finalizacji
                    zamówienia
                </div>
                <div className="cart-wrapper bottom-margin-8">
                <div className="row">
                <div className="col-md-8 cart">
                <div className="title">
                <div className="row">
                <div className="col">
                <h4><b>Twój koszyk</b></h4>
                </div>
                <div className="col align-self-center text-right text-muted">Ilość przedmiotów: 2</div>
                </div>
                </div>
                Koszyk pusty
                <div className="row border-top border-bottom">
                <div className="row main align-items-center">
                <div className="col-2"><img className="img-fluid" src="http://localhost:8080/resources/mainImages/98/java-logo.png"/>
                </div>
                <div className="col">
                <div className="row text-muted">Kategoria</div>
                <div className="row">Nazwa produktu</div>
                </div>
                <div className="col"><a href="#" className="operator-sign">-</a><a href="#" className="border">1</a><a href="#" className="operator-sign">+</a>
                </div>
                <div className="col">44 zł<a className="close">&#10005;</a></div>
                </div>
                </div>
            {/*<div className="row border-top border-bottom">*/}
            {/*    <div className="row main align-items-center">*/}
            {/*        <div className="col-2"><img className="img-fluid" src="http://localhost:8080/resources/mainImages/98/java-logo.png"/>*/}
            {/*        </div>*/}
            {/*        <div className="col">*/}
            {/*            <div className="row text-muted">Kategoria</div>*/}
            {/*            <div className="row">Nazwa produktu</div>*/}
            {/*        </div>*/}
            {/*        <div className="col"><a href="#" className="operator-sign">-</a><a href="#" className="border">1</a><a href="#" className="operator-sign">+</a>*/}
            {/*        </div>*/}
            {/*        <div className="col">120.55 zł<a className="close">&#10005;</a></div>*/}
            {/*    </div>*/}
            {/*</div>*/}
                <div className="back-to-shop"><a href="/" className="left-arrow"><i className="fa fa-arrow-left"/></a><span
                className="text-muted">Wróć do strony głównej</span></div>
                </div>
                <div className="col-md-4 summary">
                <div>
                <h5><b>Podsumowanie</b></h5>
                </div>
                <hr/>
                <div className="row" style={{marginBottom: "0.5em"}}>
                <div className="col-7" style={{paddingLeft: "0"}}>Nazwa produktu</div>
                <div className="col-5 text-right" style={{paddingLeft: "0"}}>1 x 44 zł</div>
                </div>
            {/*<div className="row" style={{marginBottom: "0.5em"}}>*/}
            {/*    <div className="col-7" style={{paddingLeft: "0"}}>Nazwa produktu</div>*/}
            {/*    <div className="col-5 text-right" style={{paddingLeft: "0"}}>1 x 120.55 zł</div>*/}
            {/*</div>*/}
            {/*<form>*/}
            {/*    Future promo code*/}
            {/*    <p>PODAJ KOD</p> <input id="code" placeholder="Wpisz kod promocyjny"/>*/}
            {/*</form>*/}

                <div className="row" style={{borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0"}}>
                <div className="col-7">SUMA</div>
                <div className="col-5 text-right">164.55 zł</div>
                </div>
                <button className="btn">ZATWIERDŹ ZAMÓWIENIE</button>
                </div>
                </div>
                </div>
                </div>
            }
        </div>
    )
}

export default Cart;
