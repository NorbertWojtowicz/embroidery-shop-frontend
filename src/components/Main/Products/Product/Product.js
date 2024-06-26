import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import CookieUtil from "../../../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../../../Config/AxiosApiInstance";
import API_URL from "../../../../Config/API_URL";
import MessageUtil from "../../../MessageUtil/MessageUtil";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const token = CookieUtil.getCookie("access_token");

  function navigateToProductDetails(e) {
    e.preventDefault();
    navigate("produkty/" + product.id);
  }

  async function addToCart(e, quantity) {
    e.preventDefault();
    await axiosApiInstance
      .post(
        API_URL + `/cart/add/${product.id}/${quantity}`,
        {},
        { headers: { Authorization: token } }
      )
      .then((res) =>
        MessageUtil.renderSuccessMessage(
          "Pomyślnie dodano produkt '" + product.name + "'"
        )
      )
      .catch((err) => {
        const status = err.response.status;
        if (status === 401 || status === 500) {
          navigate("/logowanie");
        }
      });
  }

  return (
    <div className="product-wrapper">
      <div className="main-image">
        <img
          className="product-details-image"
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
      <div className="card-body text-center mx-auto">
        {/*  <div className="cvp">*/}
        <h5 className="card-title font-weight-bold">{product.name}</h5>
        <p className="card-text">{product.price}zł</p> {/*</div>*/}
        {/*</div>*/}
      </div>
      <div className="card-buttons-wrapper">
        <a
          href={"/"}
          className="btn details"
          onClick={(e) => navigateToProductDetails(e)}
        >
          Zobacz detale
        </a>
        {/*<br />*/}
        <a href={"/"} className="btn cart" onClick={(e) => addToCart(e, 1)}>
          DO KOSZYKA
        </a>
      </div>
    </div>
  );
};

export default Product;
