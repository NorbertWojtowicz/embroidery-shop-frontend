import "./ProductCreator.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CookieUtil from "../../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../../Config/AxiosApiInstance";
import API_URL from "../../../Config/API_URL";
import LoadingSpinnerGrow from "../../LoadingSpinnerGrow/LoadingSpinnerGrow";
import MessageUtil from "../../MessageUtil/MessageUtil";
import ErrorMessage from "../../ErrorContainers/ErrorMessage/ErrorMessage";

const ProductCreator = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [state, setState] = useState({
    categories: [],
    isAdmin: false,
  });
  const [isLoaded, setLoaded] = useState(true);

  const token = CookieUtil.getCookie("access_token");

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

  async function addProduct(e) {
    setLoaded(false);
    e.preventDefault();
    const productForm = document.querySelector("#product-form");
    const newProduct = {
      name: productForm.name.value,
      description: productForm.description.value,
      price: Number(productForm.price.value),
      mainImageName: productForm.file.value.replace(/.*[/\\]/, ""),
    };
    const formData = new FormData();
    formData.append("product", JSON.stringify(newProduct));
    formData.append("multipartFile", productForm.file.files[0]);
    formData.append("category", JSON.stringify(productForm.category.value));
    await axiosApiInstance
      .post(API_URL + "/products", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        MessageUtil.renderSuccessMessage("Produkt pomyślnie dodany");
        setState({
          categories: state.categories,
          isAdmin: state.isAdmin,
        });
        productForm.reset();
      })
      .catch(() =>
        setError(
          "Coś poszło nie tak, prawdopodobnie rozmiar zdjęcia lub jego nazwy przekracza limit..."
        )
      );
    setLoaded(true);
  }

  function backToAdminPage() {
    navigate("/admin/glowna");
  }

  function backToProductManager() {
    navigate("/admin/menedzer-produktow");
  }

  return (
    <div>
      {!state.isAdmin ? (
        ""
      ) : (
        <div className="product-creator">
          {error !== "" ? <ErrorMessage message={error} /> : ""}
          <div id={"message-wr"} />
          <form id="product-form">
            <button
              type="button"
              className="btn btn-primary btn-sm btn-block"
              onClick={() => backToAdminPage()}
              style={{ margin: "0" }}
            >
              <span className="glyphicon glyphicon-share-alt" /> Wróć do panelu
              admina
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm btn-block"
              onClick={() => backToProductManager()}
              style={{ margin: "0 0 0 2em" }}
            >
              <span className="glyphicon glyphicon-share-alt" /> Wróć do
              menedżera produktów
            </button>
            <h1>Stwórz produkt</h1>
            <div className="form-group">
              <label htmlFor="name">Nazwa produktu</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Pluszak"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Cena produktu</label>
              <input
                type="number"
                step="0.1"
                className="form-control"
                id="price"
                placeholder="39.99"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Wybierz kategorię</label>
              <select className="form-control" id="category">
                {state.categories.map((category) => (
                  <option key={category.categoryId}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Opis produktu</label>
              <textarea className="form-control" id="description" rows="3" />
            </div>
            <div className="form-group">
              <label htmlFor="file">Główny obraz produktu</label>
              <input type="file" className="form-control" id="file" />
            </div>
            {isLoaded ? (
              <button
                type="submit"
                className="btn btn-primary form-control"
                onClick={(e) => addProduct(e)}
              >
                Dodaj produkt
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

export default ProductCreator;
