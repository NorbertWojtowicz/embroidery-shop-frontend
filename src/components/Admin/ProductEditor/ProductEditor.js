import './ProductEditor.css';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CookieUtil from "../../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../../Config/AxiosApiInstance";

const ProductEditor = () => {

    const {id} = useParams();
    const token = CookieUtil.getCookie("access_token");
    const navigate = useNavigate();

    const [state, setState] = useState({
        categories: [],
        product: {},
        message: "",
        isLoaded: false,
        isAdmin: false,
    });

    useEffect(() => {
        async function fetchData() {
            let isAdminTemp = false;
            await axiosApiInstance.get("http://localhost:8080/profile/details", {
                headers: {'Authorization': token}
            }).then(res => {isAdminTemp = res.data.roles.includes("ADMIN")});
            let categories = [];
            await axiosApiInstance.get("http://localhost:8080/products/category")
                .then(res => {categories = res.data})
                .catch();
            await axiosApiInstance.get(`http://localhost:8080/products/${id}`)
                .then(res => setState({categories: categories, message: "", product: res.data,
                    isLoaded: true, isAdmin: isAdminTemp}))
                .catch();
        }
        fetchData();
    }, [id, token]);

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
        axiosApiInstance.put("http://localhost:8080/products", modifiedProduct, {
            headers: {"Authorization": token},
        })
            .then(res => setState({categories: state.categories, message: "Edycja przebiegła pomyślnie",
                product: res.data, isLoaded: true, isAdmin: state.isAdmin}))
            .catch(err => setState({categories: state.categories, message: err.response.data.message,
                product: modifiedProduct, isLoaded: true, isAdmin: state.isAdmin}));
    }

    function backToProductManager() {
        navigate("/admin/menedzer-produktow");
    }

    return (
        <div>
        {state.isLoaded && state.isAdmin ?
                <div className="product-creator">
                    {state.message !== "" ?
                        <div className="alert alert-success alert-cart" role="alert" style={{margin: "1em auto"}}>
                            {state.message}
                        </div>
                        : ""}
                    <form id="product-form">
                        <button type="button" className="btn btn-primary btn-sm btn-block" style={{margin: "0"}}
                                onClick={() => backToProductManager()}>
                            <span className="glyphicon glyphicon-share-alt"/> Wróć do menedżera produktów
                        </button>
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
