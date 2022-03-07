import './CategoryCreator.css';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import CookieUtil from "../../../CookieUtil/CookieUtil";

const CategoryCreator = () => {

    const navigate = useNavigate();
    const token = CookieUtil.getCookie("access_token");

    const [state, setState] = useState({
        message: "",
        isAdmin: false
    });

    useEffect(() => {
        async function fetchData() {
            let isAdminTemp = false;
            await axios.get("http://localhost:8080/profile/details", {
                headers: {'Authorization': token}
            }).then(res => {isAdminTemp = res.data.roles.includes("ADMIN")});
            setState({message: "", isAdmin: isAdminTemp});
        }
        fetchData();
    }, [token]);

    function backToCategoryManager() {
        navigate("/admin/menedzer-kategorii");
    }

    async function addCategory(e) {
        e.preventDefault();
        const categoryForm = document.querySelector("#category-form");
        const newCategory = {
            name: categoryForm.name.value,
        }
        await axios.post("http://localhost:8080/products/category", newCategory, {
            headers: {"Authorization": token},
        })
            .then(res => setState({
                message: "Kategoria pomyślnie dodana"
            })).catch(err => setState({message: err.response.data.message, isAdmin: state.isAdmin}));
    }

    return (
        <div>
        {!state.isAdmin ? "" :
            <div className="product-creator">
                {state.message !== "" ?
                    <div className="alert alert-success alert-cart" role="alert" style={{margin: "1em auto"}}>
                        {state.message}
                    </div>
                    : ""}
                <form id="category-form">
                    <button type="button" className="btn btn-primary btn-sm btn-block"
                            onClick={() => backToCategoryManager()} style={{margin: "0"}}>
                        <span className="glyphicon glyphicon-share-alt"/> Wróć do menedżera kategorii
                    </button>
                    <h1>Stwórz Kategorię</h1>
                    <div className="form-group">
                        <label htmlFor="name">Nazwa kategorii</label>
                        <input type="text" className="form-control" id="name"
                               placeholder="Pluszaki"/>
                    </div>

                    <button type="submit" className="btn btn-primary form-control"
                            onClick={(e) => addCategory(e)}>Dodaj kategorię</button>
                </form>
            </div>
        }
        </div>
    )
}

export default CategoryCreator;
