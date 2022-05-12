import "./ProductManager.css";
import PaginationBar from "../../Main/Products/PaginationBar/PaginationBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CookieUtil from "../../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../../Config/AxiosApiInstance";
import API_URL from "../../../Config/API_URL";
import MessageUtil from "../../MessageUtil/MessageUtil";

const ProductManager = () => {
  const token = CookieUtil.getCookie("access_token");
  const navigate = useNavigate();

  const [state, setState] = useState({
    products: [],
    currentPage: 1,
    isAdmin: false,
  });

  let [page, setPage] = useState(state.currentPage);

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
        .get(API_URL + `/products?page=${page - 1}`)
        .then((res) =>
          setState({
            currentPage: res.data.currentPage,
            isAdmin: isAdminTemp,
            products: res.data.products,
            ...res.data,
          })
        );
    }
    fetchData();
  }, [page, token]);

  function openEditor(id) {
    navigate(`/admin/edytor-produktow/${id}`);
  }

  function deleteProduct(id) {
    axiosApiInstance
      .delete(API_URL + `/products/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        MessageUtil.renderSuccessMessage(`Produkt ${id} usuniety`);
        setState({
          products: state.products.filter((p) => p.id !== id),
          currentPage: state.currentPage,
          isAdmin: state.isAdmin,
        });
      })
      .catch();
  }

  function backToAdminPage() {
    navigate("/admin/glowna");
  }

  function openProductCreator() {
    navigate("/admin/kreator-produktow");
  }

  return (
    <div>
      {!state.isAdmin ? (
        ""
      ) : (
        <div className="container">
          <link
            href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css"
            rel="stylesheet"
            id="bootstrap-css"
          />
          <div className="row">
            <div id={"message-wr"} />
            <div className="col-xs-8">
              <div className="panel panel-info" style={{ width: "100%" }}>
                <div className="panel-heading">
                  <div className="panel-title">
                    <div className="row">
                      <div className="col-xs-6">
                        <h3 style={{ margin: "0" }}>Menedżer produktów</h3>
                      </div>
                      <div className="col-xs-3">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm btn-block"
                          onClick={() => backToAdminPage()}
                        >
                          <span className="glyphicon glyphicon-share-alt" />{" "}
                          Wróć do panelu admina
                        </button>
                      </div>
                      <div className="col-xs-3">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm btn-block"
                          onClick={() => openProductCreator()}
                        >
                          <span className="glyphicon glyphicon-share-alt" />{" "}
                          Kreator produktów
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  {state.products.map((product) => (
                    <div key={product.id}>
                      <div className="row">
                        <div className="col-xs-2">
                          <img
                            className="img-responsive"
                            src={
                              API_URL +
                              "/resources/mainImages/" +
                              product.id +
                              "/" +
                              product.mainImageName
                            }
                            alt="Zdjecie produktu"
                          />
                        </div>
                        <div className="col-xs-7">
                          <h4 className="product-name">
                            <strong>
                              {product.name} #{product.id}
                            </strong>
                          </h4>
                          <h4>
                            <small>{product.category.name}</small>
                          </h4>
                          <h4>
                            <small>{product.description}</small>
                          </h4>
                        </div>
                        <div className="col-xs-3" style={{ marginTop: "2em" }}>
                          <div className="col-xs-6 text-right">
                            <h6>
                              <strong>
                                {product.price}
                                <span className="text-muted">zł</span>
                              </strong>
                            </h6>
                          </div>
                          <div className="col-xs-2">
                            <button
                              type="button"
                              className="btn btn-link btn-xs"
                            >
                              <span
                                className="glyphicon glyphicon-trash btn-option"
                                onClick={() => deleteProduct(product.id)}
                              >
                                {" "}
                              </span>
                            </button>
                            <button
                              type="button"
                              className="btn btn-link btn-xs"
                              style={{ marginTop: "1em" }}
                            >
                              <span
                                className="glyphicon glyphicon-edit btn-option"
                                onClick={() => openEditor(product.id)}
                              >
                                {" "}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
                <div className="panel-footer">
                  <div className="row text-center">
                    <PaginationBar state={state} setPage={setPage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
