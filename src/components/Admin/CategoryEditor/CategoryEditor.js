import './CategoryEditor.css';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CookieUtil from "../../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../../Config/AxiosApiInstance";

const CategoryEditor = () => {

    const {id} = useParams();
    const token = CookieUtil.getCookie("access_token");
    const navigate = useNavigate();

    const [state, setState] = useState({
        category: {},
        message: "",
        isLoaded: false,
        isAdmin: false
    });

    useEffect(() => {
        async function fetchData() {
            let isAdminTemp = false;
            await axiosApiInstance.get("http://localhost:8080/profile/details", {
                headers: {'Authorization': token}
            }).then(res => {isAdminTemp = res.data.roles.includes("ADMIN")});
            let categories = [];
            await axiosApiInstance.get(`http://localhost:8080/products/category`)
                .then(res => {categories = res.data})
                .catch();
            for (const cat of categories) {
                if (cat.categoryId === Number(id)) {
                    setState({category: cat, message: "", isLoaded: true, isAdmin: isAdminTemp});
                    break;
                }
            }
        }
        fetchData();
    }, [id, token]);

    function backToCategoryManager() {
        navigate("/admin/menedzer-kategorii");
    }

    function editCategory(e) {
        e.preventDefault();
        const categoryForm = document.querySelector("#category-form");
        const modifiedCategory = {
            categoryId: state.category.categoryId,
            name: categoryForm.name.value,
        }
        axiosApiInstance.put("http://localhost:8080/products/category", modifiedCategory, {
            headers: {"Authorization": token},
        })
            .then(res => setState({category: res.data, message: "Edycja przebiegła pomyślnie",
                isLoaded: true, isAdmin: state.isAdmin}))
            .catch(err => setState({category: state.category, message: err.response.data.message,
                isLoaded: true, isAdmin: state.isAdmin}));
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
                    <form id="category-form">
                        <button type="button" className="btn btn-primary btn-sm btn-block" style={{margin: "0"}}
                                onClick={() => backToCategoryManager()}>
                            <span className="glyphicon glyphicon-share-alt"/> Wróć do menedżera kategorii
                        </button>
                        <h1>Edytuj Kategorię</h1>
                        <div className="form-group">
                            <label htmlFor="name">Nazwa kategorii</label>
                            <input type="text" className="form-control" id="name"
                                   defaultValue={state.category.name}/>
                        </div>

                        <button type="submit" className="btn btn-primary form-control" onClick={(e) => editCategory(e)}>Edytuj kategorię</button>
                    </form>
                </div>
                : <div>Nie ma takiej kategorii...</div>}
        </div>
    )
}

export default CategoryEditor;
