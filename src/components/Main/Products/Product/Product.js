import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Product.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Product = ({product}) => {

    const navigate = useNavigate();
    const token = decodeURI(document.cookie.split("=")[1]);

    function navigateToProductDetails(e) {
        e.preventDefault();
        navigate('produkty/' + product.id);
    }

    async function addToCart(e, quantity) {
        e.preventDefault();
        console.log(token);
        await axios.post(`http://localhost:8080/cart/add/${product.id}/${quantity}`, {}, {headers: {"Authorization": token}}).then(res => console.log(res))
            .catch(err => {
                console.log(err + "Id:" + product.id + " Q: " + quantity);
                if (err.response.status === 401) {
                    navigate("/logowanie");
                } else {
                    console.log("Something went wrong...");
                }
            });
    }

    return (
            <div className="product-wrapper">
                <div className='main-image'>
                    <img className='product-details-image' src={"http://localhost:8080/resources/mainImages/" + product.id + "/" + product.mainImageName} alt="Zdjecie produktu"/>
                </div>
                <div className="card-body text-center mx-auto">
                    <div className='cvp'>
                        <h5 className="card-title font-weight-bold">{product.name}</h5>
                        <p className="card-text">{product.price}zł</p> <a href={"/"} className="btn details" onClick={(e) => navigateToProductDetails(e)}>Zobacz detale</a><br/>
                        <a href={"/"} className="btn cart" onClick={(e) => addToCart(e, 1)}>DO KOSZYKA</a>
                    </div>
                </div>
            </div>
    );
}

export default Product;