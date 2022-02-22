import './ProductCreator.css';
import {useEffect, useState} from "react";
import axios from "axios";

const ProductCreator = () => {

    const token = decodeURI(document.cookie.split("=")[1]);

    const [state, setState] = useState({
        categories: [],
        message: ""
    });

    useEffect(() => {
        axios.get("http://localhost:8080/products/category").then(res => setState({categories: res.data, message: ""}));
    }, []);

    return (
        <div className="product-creator">
            {state.message !== "" ?
                <div className="alert alert-success alert-cart" role="alert" style={{margin: "1em auto"}}>
                    {state.message}
                </div>
                : ""}
            <form id="product-form">
                <h1>Stwórz produkt</h1>
                <div className="form-group">
                    <label htmlFor="name">Nazwa produktu</label>
                    <input type="text" className="form-control" id="name"
                           placeholder="Pluszak"/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Cena produktu</label>
                    <input type="number" step="0.1" className="form-control" id="price"
                           placeholder="39.99"/>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Wybierz kategorię</label>
                    <select className="form-control" id="category">
                        {state.categories.map(category => <option key={category.categoryId} value={category.categoryId}>{category.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Opis produktu</label>
                    <textarea className="form-control" id="description" rows="3"/>
                </div>
                <div className="form-group">
                    <label htmlFor="file">Główny obraz produktu</label>
                    <input type="file" className="form-control" id="file"/>
                </div>
                <button type="submit" className="btn btn-primary form-control">Dodaj produkt</button>
            </form>
        </div>
    );
}

export default ProductCreator;
