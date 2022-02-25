import './CategoryManager.css';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const CategoryManager = () => {

    const navigate = useNavigate();
    const token = decodeURI(document.cookie.split("=")[1]);

    const [state, setState] = useState({
        categories: [],
        message: ""
    });

    useEffect(() => {
        axios.get("http://localhost:8080/products/category").then(res => setState({categories: res.data, message: ""}));
    }, []);

    function backToAdminPage() {
        navigate("/admin/glowna");
    }

    function deleteCategory(id) {

    }

    function openCategoryEditor(id) {
        navigate(`/admin/edytor-kategorii/${id}`);
    }

    return (
        <div className="container">
            {state.message !== "" ?
                <div className="alert alert-info alert-cart" role="alert" style={{margin: "1em auto"}}>
                    {state.message}
                </div>
                : ""}
            <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
            <div className="row">
                <div className="col-xs-8">
                    <div className="panel panel-info" style={{width: "100%"}}>
                        <div className="panel-heading">
                            <div className="panel-title">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <h3 style={{margin: "0"}}>Menedżer kategorii</h3>
                                    </div>
                                    <div className="col-xs-6">
                                        <button type="button" className="btn btn-primary btn-sm btn-block"
                                                onClick={() => backToAdminPage()}>
                                            <span className="glyphicon glyphicon-share-alt"/> Wróć do panelu admina
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            {state.categories.map(category =>
                                <div key={category.categoryId}>
                                    <div className="row">
                                        <div className="col-xs-7">
                                            <h4 className="product-name"><strong>{category.name}</strong></h4>
                                        </div>
                                        <div className="col-xs-3" style={{marginTop: "2em"}}>
                                            <div className="col-xs-2">
                                                <button type="button" className="btn btn-link btn-xs">
                                                    <span className="glyphicon glyphicon-trash btn-option"
                                                          onClick={() => deleteCategory(category.categoryId)}> </span>
                                                </button>
                                                <button type="button" className="btn btn-link btn-xs" style={{marginTop: "1em"}}>
                                                    <span className="glyphicon glyphicon-edit btn-option"
                                                          onClick={() => openCategoryEditor(category.categoryId)}> </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryManager;
