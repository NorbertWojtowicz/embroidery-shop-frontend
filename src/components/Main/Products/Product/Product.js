import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Product.css';

const Product = ({product}) => {
    return (
        <div className='container'>
            <div className="card">
                <div className='main-image'>
                    <img src="java-logo.png"/>
                </div>
                <div className="card-body text-center mx-auto">
                    <div className='cvp'>
                        <h5 className="card-title font-weight-bold">{product.name}</h5>
                        <p className="card-text">{product.price}zł</p> <a href="#" className="btn details">Zobacz detale</a><br/>
                        <a href="#" className="btn cart">DO KOSZYKA</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;