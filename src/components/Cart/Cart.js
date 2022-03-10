import './Cart.css';
import {useEffect, useState} from "react";
import CookieUtil from "../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../Config/AxiosApiInstance";

const Cart = ({setMessage}) => {

    const [state, setState] = useState({
        cartItems: [],
        totalPrice: 0,
    })
    const token = CookieUtil.getCookie("access_token");

    useEffect(() => {
        axiosApiInstance.get("http://localhost:8080/cart", {headers: {
            "Authorization": token
            }
        }).then(res => {
            setState({
                cartItems: [...res.data],
                totalPrice: res.data.reduce((tot, cur) => tot + (cur.product.price * cur.quantity), 0),
            });
        }).catch();
    }, [token]);

    async function updateProductQuantity(e, cartItem, operation) {
        e.preventDefault();
        const updatedQuantity = getUpdatedQuantity(operation, cartItem.quantity);
        if (!updatedQuantity.isValid) return;
        await sendRequestToUpdateQuantity(cartItem, updatedQuantity.value);
        const updatedTotalPrice = state.cartItems.reduce((tot, cur) =>
            tot + (Math.round(cur.product.price * cur.quantity)), 0);
        if (updatedQuantity.value === 0) {
            updateStatePriceAndRemoveCartItem(updatedTotalPrice, cartItem);
            return;
        }
        updateStatePrice(updatedTotalPrice);
    }

    function getUpdatedQuantity(operation, prevQuantity) {
        if (operation === "+")  return {value: prevQuantity + 1, isValid: true};
        else if (operation === "-")  return {value: prevQuantity - 1, isValid: true};
        else return {value: prevQuantity, isValid: false};
    }

    async function sendRequestToUpdateQuantity(cartItem, quantity) {
        await axiosApiInstance.put(`http://localhost:8080/cart/update/${cartItem.product.id}/${quantity}`, {}, {
            headers: {"Authorization": token}
        }).then((res) => {
            updateCartItemQuantity(cartItem.id, quantity);
        });
    }

    function updateCartItemQuantity(cartItemId, quantity) {
        for (let i = 0; i < state.cartItems.length; i++) {
            if (state.cartItems[i].id === cartItemId) {
                state.cartItems[i].quantity = quantity;
                break;
            }
        }
    }

    function updateStatePriceAndRemoveCartItem(updatedTotalPrice, cartItem) {
        setState({
            totalPrice: updatedTotalPrice,
            cartItems: state.cartItems.filter(item => item.id !== cartItem.id),
        });
    }

    function updateStatePrice(updatedTotalPrice) {
        setState({
            totalPrice: updatedTotalPrice,
            cartItems: state.cartItems,
        });
    }

    async function removeCartItem(e, cartItem) {
       e.preventDefault();
       await axiosApiInstance.delete(`http://localhost:8080/cart/remove/${cartItem.product.id}`, {
           headers: {"Authorization": token}
       })
           .then(res => {
               const updatedItems = state.cartItems.filter(item => item.id !== cartItem.id);
               setState({
                   cartItems: updatedItems,
                   totalPrice: updatedItems.reduce((tot, cur) => tot + (cur.product.price * cur.quantity), 0),
               })
           }).catch();
    }

    async function finalizeCart() {
        await axiosApiInstance.post("http://localhost:8080/cart/finalize", {}, {
            headers: {"Authorization": token}
        }).then(() => {
            setMessage("Zamówienie zostało pomyślnie zatwierdzone, " +
                "proszę o kontakt na messengerze w celu finalizacji zamówienia (płatnosć oraz wysyłka). " +
                "<a href='https://www.facebook.com/messages/t/100054510993416' target='_blank'>Kliknięcie 'TUTAJ' " +
                "spowoduje przejście do konwersacji.</a>");
            setState({
                cartItems: [],
                totalPrice: 0,
            });
        }).catch();
    }

    return (
        <div>
            {state.cartItems.length === 0 ?
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
                <div className="col align-self-center text-right text-muted">
                    Ilość przedmiotów: {state.cartItems.length}
                </div>
                </div>
                </div>
                    {state.cartItems.map(cartItem =>
                            <div className="row border-top border-bottom" key={cartItem.product.id}>
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
                                    <div className="col">
                                        <a href="/"
                                           onClick={e =>
                                               updateProductQuantity(e, cartItem, "-")}
                                           className="operator-sign">-</a>

                                        <a href="/" className="border disabled">{cartItem.quantity}</a>

                                        <a href="/"
                                           onClick={(e) =>
                                               updateProductQuantity(e, cartItem, "+")}
                                           className="operator-sign">+</a>
                                    </div>
                                    <div className="col price-label">
                                        {Math.round(cartItem.product.price * cartItem.quantity * 100) / 100} zł
                                        <a href={"/"} className="close"
                                           onClick={(e) => removeCartItem(e, cartItem)}>&#10005;
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                <div className="back-to-shop">
                    <a href="/" className="left-arrow">
                        <i className="fa fa-arrow-left"/>
                    </a>
                    <span className="text-muted">Wróć do strony głównej</span>
                </div>
                </div>
                <div className="col-md-4 summary">
                <div>
                <h5><b>Podsumowanie</b></h5>
                </div>
                <hr/>
                    {state.cartItems.map(cartItem =>
                            <div className="row" style={{marginBottom: "0.5em"}} key={cartItem.product.id}>
                                <div className="col-7" style={{paddingLeft: "0"}}>{cartItem.product.name}</div>
                                <div className="col-5 text-right" style={{paddingLeft: "0"}}>
                                    {cartItem.quantity} x {cartItem.product.price} zł</div>
                            </div>
                        )}

            {/*<form>*/}
            {/*    /!*Future promo code*!/*/}
            {/*    <p>PODAJ KOD</p> <input id="code" placeholder="Wpisz kod promocyjny"/>*/}
            {/*</form>*/}

                <div className="row row-summary" style={{borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0"}}>
                    <div className="col-7">SUMA</div>
                    <div className="col-5 text-right">{Math.round(state.totalPrice * 100) / 100} zł</div>
                </div>
                <button className="btn" onClick={() => finalizeCart()}>ZATWIERDŹ ZAMÓWIENIE</button>
                </div>
                </div>
                </div>
                </div>
            }
        </div>
    )
}

export default Cart;
