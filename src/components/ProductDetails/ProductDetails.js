import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorContainers/ErrorMessage/ErrorMessage";
import CookieUtil from "../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../Config/AxiosApiInstance";
import axios from "axios";
import API_URL from "../../Config/API_URL";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import MessageUtil from "../MessageUtil/MessageUtil";

const ProductDetails = () => {
  const navigate = useNavigate();
  const token = CookieUtil.getCookie("access_token");
  const { id } = useParams();
  const [product, setProduct] = useState({
    isLoaded: false,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(API_URL + `/products/${id}`)
        .then((res) => setProduct({ ...res.data, isLoaded: true }))
        .catch((err) => {
          setError(err.response.data.message);
          setProduct({ isLoaded: true });
        });
    }
    fetchData();
  }, [id]);

  async function addProductToCart(e, id) {
    e.preventDefault();
    const form = document.querySelector(".details-form");
    const quantity = form.quantity.value;
    await axiosApiInstance
      .post(
        API_URL + `/cart/add/${id}/${quantity}`,
        {},
        { headers: { Authorization: token } }
      )
      .then((res) =>
        MessageUtil.renderSuccessMessage(
          "Produkt '" + product.name + "' dodany!"
        )
      )
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/logowanie");
        } else {
          const errMessage = err.response.data.message;
          setError(
            errMessage === "No message available"
              ? "Coś poszło nie tak..."
              : errMessage
          );
        }
      });
  }

  return (
    <div className="">
      {error !== "" ? <ErrorMessage message={error} /> : ""}
      {product.isLoaded ? (
        <div className="product-details-wrapper">
          <div id={"message-wr"} />
          <div className="img-container bottom-margin-8">
            <img
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
          <div className="details-container">
            <h1 className="name-header">{product.name}</h1>
            <div>
              <span className="category-wrapper">{product.category.name}</span>
              <span className="id-wrapper">#{product.id}</span>
            </div>
            <div className="top-margin-4 clear-both">
              <p className="lead footer-right-top font-weight-bold">Cena:</p>
              <p className="lead field-value-wrapper">
                <span>{product.price}zł</span>
              </p>
            </div>
            <p className="lead font-weight-bold footer-right-top">Opis:</p>
            <p className="lead field-value-wrapper description">
              {product.description}
            </p>

            <form className="d-flex justify-content-left top-margin-2 details-form">
              <input
                type="number"
                aria-label="Search"
                name="quantity"
                defaultValue="1"
                className="form-control quantity-input"
              />
              <button
                className="btn btn-add-to-cart btn-primary btn-md my-0 p"
                type="submit"
                onClick={(e) => addProductToCart(e, product.id)}
              >
                Dodaj do koszyka&nbsp;
                <i className="fa fa-shopping-cart ml-1" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div style={{ margin: "0 auto!important", width: "100px" }}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
