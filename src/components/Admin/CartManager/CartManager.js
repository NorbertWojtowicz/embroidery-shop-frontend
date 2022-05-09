import "./CartManager.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CookieUtil from "../../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../../Config/AxiosApiInstance";
import API_URL from "../../../Config/API_URL";
import PaginationBar from "../../Main/Products/PaginationBar/PaginationBar";

const CartManager = ({ setMessage }) => {
  const navigate = useNavigate();
  const token = CookieUtil.getCookie("access_token");

  const [state, setState] = useState({
    carts: [],
    isLoaded: false,
    isAdmin: false,
    currentPage: 1,
  });
  const [page, setPage] = useState(state.currentPage);

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
        .get(`${API_URL}/cart/all?page=${page - 1}`, {
          headers: { Authorization: token },
        })
        .then((res) =>
          setState({ isLoaded: true, isAdmin: isAdminTemp, ...res.data })
        );
    }
    fetchData();
  }, [token, page]);

  function backToAdminPage() {
    navigate("/admin/glowna");
  }

  function openCartDetails(id) {
    navigate(`/admin/menedzer-zamowien/${id}`);
  }

  function completeOrder(cart) {
    if (cart.completed) {
      setMessage("Zamówienie jest już zakończone");
      setState({ carts: state.carts, isLoaded: true, isAdmin: state.isAdmin });
    } else {
      axiosApiInstance
        .post(
          API_URL + `/cart/complete/${cart.id}`,
          {},
          { headers: { Authorization: token } }
        )
        .then((res) => {
          setMessage("Zamówienie zostało zakończone");
          setState({
            carts: state.carts,
            isLoaded: true,
            isAdmin: state.isAdmin,
          });
        })
        .catch((err) => {
          setMessage("Nie można zakończyć zamówienia");
          setState({
            carts: state.carts,
            isLoaded: true,
            isAdmin: state.isAdmin,
          });
        });
    }
  }

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
                        <h3 style={{ margin: "0" }}>Menedżer zamówień</h3>
                      </div>
                      <div className="col-xs-6">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm btn-block"
                          onClick={() => backToAdminPage()}
                        >
                          <span className="glyphicon glyphicon-share-alt" />{" "}
                          Wróć do panelu admina
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  {state.carts.map((cart) =>
                    cart.status !== "requires_payment_method" ? (
                      <div key={cart.id}>
                        <div className="row">
                          <div className="col-xs-2">
                            <img
                              className="img-responsive"
                              src={
                                API_URL +
                                "/resources/" +
                                (cart.completed ? "check" : "cross") +
                                ".png"
                              }
                              alt="Zdjecie produktu"
                            />
                          </div>
                          <div className="col-xs-5">
                            <h4 className="product-name">
                              <strong>
                                {cart.user.username} #{cart.id}
                              </strong>
                            </h4>
                            <h4>
                              <small>{cart.user.email}</small>
                            </h4>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm btn-block"
                              onClick={() => openCartDetails(cart.id)}
                              style={{ margin: "0" }}
                            >
                              <span className="glyphicon glyphicon-info-sign" />{" "}
                              Szczegóły zamówienia
                            </button>
                            <button
                              type="button"
                              className="btn btn-success btn-sm btn-block"
                              onClick={() => completeOrder(cart)}
                              style={{
                                margin: "2em auto 0 auto",
                                width: "70%",
                              }}
                            >
                              <span className="glyphicon glyphicon-check" />{" "}
                              Zakończ zamówienie
                            </button>
                          </div>
                          <div
                            className="col-xs-5"
                            style={{ marginTop: "2em" }}
                          >
                            <h5>Całkowita cena zamówienia</h5>
                            <div className="col-xs-9 text-center">
                              <h5>
                                <strong>
                                  {Math.round(cart.totalPrice * 100) / 100}
                                  <span className="text-muted">zł</span>
                                </strong>
                              </h5>
                            </div>
                            <br />
                            <br />
                            <h5>Status płatności</h5>
                            <div className="col-xs-9 text-center">
                              <h5>
                                <strong>{renderStatus(cart.status)}</strong>
                              </h5>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
                <div
                  style={{
                    margin: "0 auto!important",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <PaginationBar state={state} setPage={setPage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartManager;
