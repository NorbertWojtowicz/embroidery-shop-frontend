import "./CategoryManager.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CookieUtil from "../../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../../Config/AxiosApiInstance";
import API_URL from "../../../Config/API_URL";
import MessageUtil from "../../MessageUtil/MessageUtil";

const CategoryManager = () => {
  const navigate = useNavigate();
  const token = CookieUtil.getCookie("access_token");

  const [state, setState] = useState({
    categories: [],
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
        .get(API_URL + "/products/category")
        .then((res) =>
          setState({ categories: res.data, isAdmin: isAdminTemp })
        );
    }
    fetchData();
  }, [token]);

  function backToAdminPage() {
    navigate("/admin/glowna");
  }

  function deleteCategory(id) {
    axiosApiInstance
      .delete(API_URL + `/products/category/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        MessageUtil.renderSuccessMessage(`Kategoria ${id} usunieta`);
        setState({
          categories: state.categories.filter((cat) => cat.categoryId !== id),
          isAdmin: state.isAdmin,
        });
      })
      .catch((err) => {
        MessageUtil.renderSuccessMessage(err.response.data.message);
        setState({ categories: state.categories, isAdmin: state.isAdmin });
      });
  }

  function openCategoryEditor(id) {
    navigate(`/admin/edytor-kategorii/${id}`);
  }

  function openCategoryCreator() {
    navigate("/admin/kreator-kategorii");
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
                        <h3 style={{ margin: "0" }}>Menedżer kategorii</h3>
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
                          onClick={() => openCategoryCreator()}
                        >
                          <span className="glyphicon glyphicon-share-alt" />{" "}
                          Kreator kategorii
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  {state.categories.map((category) => (
                    <div key={category.categoryId}>
                      <div className="row">
                        <div className="col-xs-7">
                          <h4 className="product-name">
                            <strong>{category.name}</strong>
                          </h4>
                        </div>
                        <div className="col-xs-3" style={{ marginTop: "2em" }}>
                          <div className="col-xs-2">
                            <button
                              type="button"
                              className="btn btn-link btn-xs"
                            >
                              <span
                                className="glyphicon glyphicon-trash btn-option"
                                onClick={() =>
                                  deleteCategory(category.categoryId)
                                }
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
                                onClick={() =>
                                  openCategoryEditor(category.categoryId)
                                }
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
