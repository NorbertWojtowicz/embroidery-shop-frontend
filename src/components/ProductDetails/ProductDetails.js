import './ProductDetails.css';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({
        isLoaded: false
    });
    const [error, setError] = useState(false);


    useEffect(() => {
            async function fetchData() {
                await axios.get(`http://localhost:8080/products/${id}`)
                    .then(res => setProduct({...res.data, isLoaded: true}))
                    .catch(() => {setError(true); setProduct({isLoaded: true})});
            }
            fetchData();
        }
    , [id]);

    return (
            <div className="p-4">
                {product.isLoaded ?
                    error ? "Brak podanego produktu..." :
                            <div className="product-details-wrapper">
                                <div className="img-container bottom-margin-8">
                                    <img src={"http://localhost:8080/resources/mainImages/" + product.id + "/" + product.mainImageName}
                                         alt="Zdjecie produktu"/>
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
                                    <p className="lead field-value-wrapper">{product.description}</p>

                                    <form className="d-flex justify-content-left top-margin-2 details-form">
                                        <input type="number" aria-label="Search" className="form-control quantity-input"/>
                                        <button className="btn btn-add-to-cart btn-primary btn-md my-0 p" type="submit">Dodaj do koszyka&nbsp;
                                            <i className="fa fa-shopping-cart ml-1"/>
                                        </button>
                                    </form>
                                </div>
                            </div>
                    : "Loading spinner"}
            </div>
    )
}

export default ProductDetails;
