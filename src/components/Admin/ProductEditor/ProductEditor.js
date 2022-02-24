import './ProductEditor.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const ProductEditor = () => {

    const {id} = useParams();
    const token = decodeURI(document.cookie.split("=")[1]);

    const [state, setState] = useState({
        categories: [],
        product: {},
        message: "",
        isLoaded: false,
    });

    useEffect(() => {
        async function fetchData() {
            let categories = [];
            await axios.get("http://localhost:8080/products/category")
                .then(res => {categories = res.data})
                .catch(err => console.log(err));
            await axios.get(`http://localhost:8080/products/${id}`)
                .then(res => setState({categories: categories, message: "", product: res.data, isLoaded: true}))
                .catch(err => console.log(err));
        }
        fetchData();
    }, [id]);

    function editProduct(e) {
        e.preventDefault();
        const productForm = document.querySelector("#product-form");
        const modifiedProduct = {
            id: state.product.id,
            name: productForm.name.value,
            description: productForm.description.value,
            price: Number(productForm.price.value),
            category: {name: productForm.category.value},
            mainImageName:state.product.mainImageName
        }
        axios.put("http://localhost:8080/products", modifiedProduct, {
            headers: {"Authorization": token},
        })
            .then(res => setState({categories: state.categories, message: "Edycja przebiegła pomyślnie", product: res.data, isLoaded: true}))
            .catch(err => setState({categories: state.categories, message: err.response.data.message, product: modifiedProduct, isLoaded: true}));
    }

    return (
        <div>
        {state.isLoaded ?
                <div className="product-creator">
                    {state.message !== "" ?
                        <div className="alert alert-success alert-cart" role="alert" style={{margin: "1em auto"}}>
                            {state.message}
                        </div>
                        : ""}
                    <form id="product-form">
                        <h1>Edytuj produkt</h1>
                        <div className="form-group">
                            <label htmlFor="name">Nazwa produktu</label>
                            <input type="text" className="form-control" id="name"
                                   defaultValue={state.product.name}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Cena produktu</label>
                            <input type="number" step="0.1" className="form-control" id="price"
                                   defaultValue={state.product.price}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Wybierz kategorię</label>
                            <select className="form-control" id="category" defaultValue={state.product.category.name}>
                                {state.categories.map(category =>
                                    <option key={category.categoryId}>
                                        {category.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Opis produktu</label>
                            <textarea className="form-control" id="description" rows="3" defaultValue={state.product.description}/>
                        </div>
                        <button type="submit" className="btn btn-primary form-control" onClick={(e) => editProduct(e)}>Edytuj produkt</button>
                    </form>
                </div>
                : <div>Nie ma takiego produktu...</div>}
        </div>
    );
}

export default ProductEditor;
