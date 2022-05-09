import "./CartDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosApiInstance from "../../../Config/AxiosApiInstance";
import CookieUtil from "../../../CookieUtil/CookieUtil";
import API_URL from "../../../Config/API_URL";

const CartDetails = ({ setMessage }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const token = CookieUtil.getCookie("access_token");

  const [state, setState] = useState({
    cart: {},
    isLoaded: false,
    isAdmin: false,
  });

  useEffect(() => {
    async function fetchData() {
      let isAdminTemp = false;
      await axiosApiInstance
        .get(API_URL + "/profile/details", {
          headers: { Authorization: token },
        })
        .then((res) => {
          isAdminTemp = res.data.roles.includes("ADMIN");
        });
      await axiosApiInstance
        .get(API_URL + `/cart/${id}`, {
          headers: { Authorization: token },
        })
        .then((res) =>
          setState({ cart: res.data, isLoaded: true, isAdmin: isAdminTemp })
        )
        .catch();
    }
    fetchData();
  }, [id, token]);

  function backToCartManager() {
    navigate("/admin/menedzer-zamowien");
  }

  function completeOrder(id) {
    if (state.cart.completed) {
      setMessage("Zamówienie jest już zakończone");
      setState({ cart: state.cart, isLoaded: true, isAdmin: state.isAdmin });
    } else {
      axiosApiInstance
        .post(
          API_URL + `/cart/complete/${id}`,
          {},
          { headers: { Authorization: token } }
        )
        .then((res) => {
          setMessage("Zamówienie zostało zakończone");
          setState({
            cart: state.cart,
            isLoaded: true,
            isAdmin: state.isAdmin,
          });
        })
        .catch((err) => {
          setMessage("Nie można zakończyć zamówienia");
          setState({
            cart: state.cart,
            isLoaded: true,
            isAdmin: state.isAdmin,
          });
        });
    }
  }

  return (
    <div className="container">
      {state.isLoaded && state.isAdmin ? (
        <div>
          <link
            href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css"
            rel="stylesheet"
            id="bootstrap-css"
          />
          <div className="row">
            <div className="col-xs-8">
              <div className="panel panel-info" style={{ width: "100%" }}>
                <div className="panel-heading">
                  <div className="panel-title">
                    <div className="row">
                      <div className="col-xs-6">
                        <h3 style={{ margin: "0" }}>
                          <strong>Zamówienie nr #{state.cart.id}</strong>
                        </h3>
                      </div>
                      <div className="col-xs-3">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm btn-block"
                          onClick={() => backToCartManager()}
                        >
                          <span className="glyphicon glyphicon-share-alt" />{" "}
                          Wróć do zamówień
                        </button>
                      </div>
                      <div className="col-xs-3">
                        <button
                          type="button"
                          className="btn btn-success btn-sm btn-block"
                          onClick={() => completeOrder(state.cart.id)}
                        >
                          <span className="glyphicon glyphicon-share-alt" />{" "}
                          Zakończ zamówienie
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  {state.cart.cartItems.map((cartItem) => (
                    <div key={cartItem.id}>
                      <div className="row">
                        <div className="col-xs-2">
                          <img
                            className="img-responsive"
                            src={
                              API_URL +
                              "/resources/mainImages/" +
                              cartItem.id +
                              "/" +
                              cartItem.product.mainImageName
                            }
                            alt="Zdjecie produktu"
                          />
                        </div>
                        <div className="col-xs-7">
                          <h4 className="product-name">
                            <strong>
                              {cartItem.product.name} #{cartItem.id}
                            </strong>
                          </h4>
                          <h4>
                            <small>{cartItem.product.category.name}</small>
                          </h4>
                          <h4>
                            <small>{cartItem.product.description}</small>
                          </h4>
                        </div>
                        <div className="col-xs-3" style={{ marginTop: "2em" }}>
                          <div className="col-xs-6 text-right">
                            <h6>
                              <strong>
                                {cartItem.product.price}
                                <span className="text-muted">zł</span>
                              </strong>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Coś poszło nie tak..."
      )}
    </div>
  );
};

export default CartDetails;
