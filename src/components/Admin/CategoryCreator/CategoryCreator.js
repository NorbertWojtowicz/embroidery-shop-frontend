import './CategoryCreator.css';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const CategoryCreator = () => {

    const navigate = useNavigate();
    const token = decodeURI(document.cookie.split("=")[1]);

    const [state, setState] = useState({
        message: ""
    });

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
            })).catch(err => setState({message: err.response.data.message}));
    }

    return (
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

                <button type="submit" className="btn btn-primary form-control" onClick={(e) => addCategory(e)}>Dodaj kategorię</button>
            </form>
        </div>
    )
}

export default CategoryCreator;
