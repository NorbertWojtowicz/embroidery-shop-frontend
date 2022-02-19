import './Cart.css';
import {useState} from "react";
import axios from "axios";

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const token = decodeURI(document.cookie.split("=")[1]);
    let totalPrice = 0;
    if (cartItems.length !== 0) {
        totalPrice = cartItems.reduce((prev, cur) => prev.subtotal + cur.subtotal)
    }
    useState(() => {
        async function fetchData() {
            await axios.get("http://localhost:8080/cart", {headers: {
                "Authorization": token
                }
            }).then(res => {
                setCartItems(res.data);
            }).catch();
        }
        fetchData();
    }, []);

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
                <div className="col align-self-center text-right text-muted">Ilość przedmiotów: {cartItems.length}</div>
                </div>
                </div>
                    {cartItems.map(cartItem =>
                            <div className="row border-top border-bottom">
                                <div className="row main align-items-center">
                                    <div className="col-2">
                                        <img className="img-fluid"
                                             src={"http://localhost:8080/resources/mainImages/" + cartItem.product.id + "/" + cartItem.product.mainImageName}
                                             alt="Zdjęcie produktu"
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="row text-muted">{cartItem.product.category.name}</div>
                                        <div className="row">{cartItem.product.name}</div>
                                    </div>
                                    <div className="col"><a href="#" className="operator-sign">-</a>
                                        <a href="#" className="border">{cartItem.quantity}</a>
                                        <a href="#" className="operator-sign">+</a>
                                    </div>
                                    <div className="col">{cartItem.subtotal} zł<a className="close">&#10005;</a></div>
                                </div>
                            </div>
                        )}
                <div className="back-to-shop"><a href="/" className="left-arrow"><i className="fa fa-arrow-left"/></a><span
                className="text-muted">Wróć do strony głównej</span></div>
                </div>
                <div className="col-md-4 summary">
                <div>
                <h5><b>Podsumowanie</b></h5>
                </div>
                <hr/>
                    {cartItems.map(cartItem =>
                            <div className="row" style={{marginBottom: "0.5em"}}>
                                <div className="col-7" style={{paddingLeft: "0"}}>{cartItem.product.name}</div>
                                <div className="col-5 text-right" style={{paddingLeft: "0"}}>{cartItem.quantity} x {cartItem.product.price} zł</div>
                            </div>
                        )}

            {/*<form>*/}
            {/*    /!*Future promo code*!/*/}
            {/*    <p>PODAJ KOD</p> <input id="code" placeholder="Wpisz kod promocyjny"/>*/}
            {/*</form>*/}

                <div className="row row-summary" style={{borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0"}}>
                    <div className="col-7">SUMA</div>
                    <div className="col-5 text-right">{totalPrice} zł</div>
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
