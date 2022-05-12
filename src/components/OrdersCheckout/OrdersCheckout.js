import { Fragment, useEffect, useState } from "react";
import CookieUtil from "../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../Config/AxiosApiInstance";
import API_URL from "../../Config/API_URL";
import "./OrdersCheckout.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import InfoMessage from "../ErrorContainers/InfoMessage/InfoMessage";

const OrdersCheckout = () => {
  const [state, setState] = useState({
    carts: [],
    isLoaded: false,
  });
  const [message, setMessage] = useState("");
  const token = CookieUtil.getCookie("access_token");

  useEffect(() => {
    axiosApiInstance
      .get(API_URL + "/cart/all/user")
      .then((res) => {
        const cartsData = res.data.filter(
          (cart) => cart.status !== "requires_payment_method"
        );
        setState({
          carts: cartsData,
          isLoaded: true,
        });
        if (cartsData.length === 0) {
          setMessage(
            "Tutaj wyświetlą się Twoje zamówienia, jeśli jakieś złożysz."
          );
        }
      })
      .catch((err) => setMessage("Zaloguj się aby zobaczyć swoje zamówienia"));
  }, [token]);

  function renderStatus(status) {
    switch (status) {
      case "succeeded":
        return "Opłacone";
      case "processing":
        return "Przetwarzanie płatności...";
      case "requires_action":
      case "requires_confirmation":
        return "Płatność wymaga potwierdzenia";
      default:
        return "Płatność trwa...";
    }
  }

  return (
    <Fragment>
      {message !== "" ? <InfoMessage message={message} /> : ""}
      {!state.isLoaded ? (
        <div className="cart-spinner">
          <LoadingSpinner />
        </div>
      ) : state.carts.length === 0 ? (
        ""
      ) : (
        <div>
          <section className="intro">
            <div
              className="bg-image h-100"
              style={{ backgroundColor: "#f5f7fa" }}
            >
              <div className="mask d-flex align-items-center h-100">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-body p-0">
                          <div
                            className="table-responsive table-scroll"
                            data-mdb-perfect-scrollbar="true"
                            style={{ position: "relative", height: "700px" }}
                          >
                            <table className="table table-striped mb-0">
                              <thead style={{ backgroundColor: "#002d72" }}>
                                <tr>
                                  <th scope="col">Numer zamówienia</th>
                                  <th scope="col">Cena</th>
                                  <th scope="col">Ilość przedmiotów</th>
                                  <th scope="col">Status płatności</th>
                                  <th scope="col">Status realizacji</th>
                                </tr>
                              </thead>
                              <tbody>
                                {state.carts.map((cart) => (
                                  <tr key={cart.id}>
                                    <td>{cart.id}</td>
                                    <td>
                                      {cart.totalPrice}zł (+15zł kurier DPD)
                                    </td>
                                    <td>{cart.cartItems.length}</td>
                                    <td>{renderStatus(cart.status)}</td>
                                    <td>
                                      {cart.completed
                                        ? "Wysłane"
                                        : "W trakcie realizacji"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </Fragment>
  );
};

export default OrdersCheckout;
