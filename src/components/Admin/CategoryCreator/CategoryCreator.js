import "./CategoryCreator.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CookieUtil from "../../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../../Config/AxiosApiInstance";
import API_URL from "../../../Config/API_URL";
import LoadingSpinnerGrow from "../../LoadingSpinnerGrow/LoadingSpinnerGrow";
import MessageUtil from "../../MessageUtil/MessageUtil";

const CategoryCreator = () => {
  const navigate = useNavigate();
  const token = CookieUtil.getCookie("access_token");
  const [isLoaded, setLoaded] = useState(true);

  const [state, setState] = useState({
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
      setState({ isAdmin: isAdminTemp });
    }
    fetchData();
  }, [token]);

  function backToCategoryManager() {
    navigate("/admin/menedzer-kategorii");
  }

  async function addCategory(e) {
    setLoaded(false);
    e.preventDefault();
    const categoryForm = document.querySelector("#category-form");
    const newCategory = {
      name: categoryForm.name.value,
    };
    await axiosApiInstance
      .post(API_URL + "/products/category", newCategory, {
        headers: { Authorization: token },
      })
      .then((res) => {
        MessageUtil.renderSuccessMessage("Kategoria pomyślnie dodana");
        setState({ isAdmin: state.isAdmin });
      })
      .catch((err) => {
        MessageUtil.renderSuccessMessage(err.response.data.message);
        setState({ isAdmin: state.isAdmin });
      });
    categoryForm.reset();
    setLoaded(true);
  }

  return (
    <div>
      {!state.isAdmin ? (
        ""
      ) : (
        <div className="product-creator">
          <div id={"message-wr"} />
          <form id="category-form">
            <button
              type="button"
              className="btn btn-primary btn-sm btn-block"
              onClick={() => backToCategoryManager()}
              style={{ margin: "0" }}
            >
              <span className="glyphicon glyphicon-share-alt" /> Wróć do
              menedżera kategorii
            </button>
            <h1>Stwórz Kategorię</h1>
            <div className="form-group">
              <label htmlFor="name">Nazwa kategorii</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Pluszaki"
              />
            </div>
            {isLoaded ? (
              <button
                type="submit"
                className="btn btn-primary form-control"
                onClick={(e) => addCategory(e)}
              >
                Dodaj kategorię
              </button>
            ) : (
              <span style={{ textAlign: "center" }}>
                <LoadingSpinnerGrow />
              </span>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default CategoryCreator;
