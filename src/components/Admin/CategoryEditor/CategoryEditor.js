import './CategoryEditor.css';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const CategoryEditor = () => {

    const {id} = useParams();
    const token = decodeURI(document.cookie.split("=")[1]);
    const navigate = useNavigate();

    const [state, setState] = useState({
        category: {},
        message: "",
        isLoaded: false,
    });

    useEffect(() => {
        async function fetchData() {
            let categories = [];
            await axios.get(`http://localhost:8080/products/category`)
                .then(res => {categories = res.data})
                .catch();
            for (const cat of categories) {
                if (cat.categoryId === Number(id)) {
                    setState({category: cat, message: "", isLoaded: true});
                    break;
                }
            }
        }
        fetchData();
    }, [id]);

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
        axios.put("http://localhost:8080/products/category", modifiedCategory, {
            headers: {"Authorization": token},
        })
            .then(res => setState({category: res.data, message: "Edycja przebiegła pomyślnie", isLoaded: true}))
            .catch(err => setState({category: state.category, message: err.response.data.message, isLoaded: true}));
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