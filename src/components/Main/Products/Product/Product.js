import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Product.css';

const Product = ({product}) => {
    return (
            <div className="card">
                <div className='main-image'>
                    <img src={"http://localhost:8080/resources/mainImages/" + product.id + "/" + product.mainImageName}/>
                </div>
                <div className="card-body text-center mx-auto">
                    <div className='cvp'>
                        <h5 className="card-title font-weight-bold">{product.name}</h5>
                        <p className="card-text">{product.price}zł</p> <a href={'produkt/' + product.name} className="btn details">Zobacz detale</a><br/>
                        <a className="btn cart">DO KOSZYKA</a>
                    </div>
                </div>
            </div>
    );
}

export default Product;