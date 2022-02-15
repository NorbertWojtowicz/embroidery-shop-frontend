import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Product.css';
import { useNavigate } from "react-router-dom";

const Product = ({product}) => {
    const navigate = useNavigate();

    function navigateToProductDetails(e) {
        e.preventDefault();
        navigate('produkty/' + product.id);
    }
    return (
            <div className="card">
                <div className='main-image'>
                    <img src={"http://localhost:8080/resources/mainImages/" + product.id + "/" + product.mainImageName} alt="Zdjecie produktu"/>
                </div>
                <div className="card-body text-center mx-auto">
                    <div className='cvp'>
                        <h5 className="card-title font-weight-bold">{product.name}</h5>
                        <p className="card-text">{product.price}zł</p> <a href={"/"} className="btn details" onClick={(e) => navigateToProductDetails(e)}>Zobacz detale</a><br/>
                        <a href={"/"} className="btn cart">DO KOSZYKA</a>
                    </div>
                </div>
            </div>
    );
}

export default Product;