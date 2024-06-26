import "./Cart.css";
import React, { useEffect, useState } from "react";
import CookieUtil from "../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../Config/AxiosApiInstance";
import API_URL from "../../Config/API_URL";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    cartItems: [],
    totalPrice: 0,
    isLoaded: false,
  });
  const token = CookieUtil.getCookie("access_token");

  useEffect(() => {
    axiosApiInstance
      .get(API_URL + "/cart", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setState({
          cartItems: [...res.data],
          totalPrice: res.data.reduce(
            (tot, cur) => tot + cur.product.price * cur.quantity,
            0
          ),
          isLoaded: true,
        });
      })
      .catch();
  }, [token]);

  async function updateProductQuantity(e, cartItem, operation) {
    e.preventDefault();
    const updatedQuantity = getUpdatedQuantity(operation, cartItem.quantity);
    if (!updatedQuantity.isValid) return;
    await sendRequestToUpdateQuantity(cartItem, updatedQuantity.value);
    const updatedTotalPrice = state.cartItems.reduce(
      (tot, cur) => tot + Math.round(cur.product.price * cur.quantity),
      0
    );
    if (updatedQuantity.value === 0) {
      updateStatePriceAndRemoveCartItem(updatedTotalPrice, cartItem);
      return;
    }
    updateStatePrice(updatedTotalPrice);
  }

  function getUpdatedQuantity(operation, prevQuantity) {
    if (operation === "+") return { value: prevQuantity + 1, isValid: true };
    else if (operation === "-")
      return { value: prevQuantity - 1, isValid: true };
    else return { value: prevQuantity, isValid: false };
  }

  async function sendRequestToUpdateQuantity(cartItem, quantity) {
    await axiosApiInstance
      .put(
        API_URL + `/cart/update/${cartItem.product.id}/${quantity}`,
        {},
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
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
      cartItems: state.cartItems.filter((item) => item.id !== cartItem.id),
      isLoaded: true,
    });
  }

  function updateStatePrice(updatedTotalPrice) {
    setState({
      totalPrice: updatedTotalPrice,
      cartItems: state.cartItems,
      isLoaded: true,
    });
  }

  async function removeCartItem(e, cartItem) {
    e.preventDefault();
    await axiosApiInstance
      .delete(API_URL + `/cart/remove/${cartItem.product.id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        const updatedItems = state.cartItems.filter(
          (item) => item.id !== cartItem.id
        );
        updateStatePriceAndRemoveCartItem(
          updatedItems.reduce(
            (tot, cur) => tot + cur.product.price * cur.quantity,
            0
          ),
          cartItem
        );
      })
      .catch();
  }

  async function navigateToCheckout() {
    navigate("/zamowienie");
  }

  return state.isLoaded ? (
    <div>
      {state.cartItems.length === 0 ? (
        <div
          className="alert alert-danger alert-cart"
          role="alert"
          style={{ marginBottom: "30em" }}
        >
          {token !== "undefined"
            ? "Koszyk jest pusty"
            : "Nie jesteś zalogowany"}
        </div>
      ) : (
        <div>
          <div className="cart-wrapper bottom-margin-8">
            <div className="row">
              <div id={"message-wr"} />
              <div className="col-md-8 cart">
                <div className="title">
                  <div className="row">
                    <div className="col">
                      <h4>
                        <b>Twój koszyk</b>
                      </h4>
                    </div>
                    <div className="col align-self-center text-right text-muted">
                      Ilość przedmiotów: {state.cartItems.length}
                    </div>
                  </div>
                </div>
                {state.cartItems.map((cartItem) => (
                  <div
                    className="row border-top border-bottom"
                    key={cartItem.product.id}
                  >
                    <div className="row main align-items-center">
                      <div className="col-2">
                        <img
                          className="img-fluid"
                          src={
                            API_URL +
                            "/resources/mainImages/" +
                            cartItem.product.id +
                            "/" +
                            cartItem.product.mainImageName
                          }
                          alt="Zdjęcie produktu"
                        />
                      </div>
                      <div className="col">
                        <div className="row text-muted">
                          {cartItem.product.category.name}
                        </div>
                        <div className="row">{cartItem.product.name}</div>
                      </div>
                      <div className="col">
                        <a
                          href="/"
                          onClick={(e) =>
                            updateProductQuantity(e, cartItem, "-")
                          }
                          className="operator-sign"
                        >
                          -
                        </a>

                        <a href="/" className="border disabled">
                          {cartItem.quantity}
                        </a>

                        <a
                          href="/"
                          onClick={(e) =>
                            updateProductQuantity(e, cartItem, "+")
                          }
                          className="operator-sign"
                        >
                          +
                        </a>
                      </div>
                      <div className="col price-label">
                        {Math.round(
                          cartItem.product.price * cartItem.quantity * 100
                        ) / 100}{" "}
                        zł
                        <a
                          href={"/"}
                          className="close"
                          onClick={(e) => removeCartItem(e, cartItem)}
                        >
                          &#10005;
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="back-to-shop">
                  <a href="/" className="left-arrow">
                    <i className="fa fa-arrow-left" />
                  </a>
                  <span className="text-muted">Wróć do strony głównej</span>
                </div>
              </div>
              <div className="col-md-4 summary">
                <div>
                  <h5>
                    <b>Podsumowanie</b>
                  </h5>
                </div>
                <hr />
                {state.cartItems.map((cartItem) => (
                  <div
                    className="row"
                    style={{ marginBottom: "0.5em" }}
                    key={cartItem.product.id}
                  >
                    <div className="col-7" style={{ paddingLeft: "0" }}>
                      {cartItem.product.name}
                    </div>
                    <div
                      className="col-5 text-right"
                      style={{ paddingLeft: "0" }}
                    >
                      {cartItem.quantity} x {cartItem.product.price} zł
                    </div>
                  </div>
                ))}

                {/*<form>*/}
                {/*    /!*Future promo code*!/*/}
                {/*    <p>PODAJ KOD</p> <input id="code" placeholder="Wpisz kod promocyjny"/>*/}
                {/*</form>*/}

                <div
                  className="row row-summary"
                  style={{
                    borderTop: "1px solid rgba(0,0,0,.1)",
                    padding: "2vh 0",
                  }}
                >
                  <div className="col-7">SUMA</div>
                  <div className="col-5 text-right">
                    {Math.round(state.totalPrice * 100) / 100} zł
                  </div>
                </div>
                <button className="btn" onClick={() => navigateToCheckout()}>
                  PRZEJDŹ DO PŁATNOŚCI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="cart-spinner">
      <LoadingSpinner />
    </div>
  );
};

export default Cart;
