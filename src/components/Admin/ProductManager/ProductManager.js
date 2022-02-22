import './ProductManager.css';
import PaginationBar from "../../Main/Products/PaginationBar/PaginationBar";
import {useEffect, useState} from "react";

const ProductManager = () => {

    const [state, setState] = useState({
        products: [],
        currentPage: 1
    });
    let [page, setPage] = useState(state.currentPage);

    useEffect(() => {
        fetch(`http://localhost:8080/products?page=${page - 1}`).then(res => res.json()).then(data => setState(data));
    }, [page]);

    return (
        <div className="container">
            <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
            <div className="row">
                <div className="col-xs-8">
                    <div className="panel panel-info" style={{width: "100%"}}>
                        <div className="panel-heading">
                            <div className="panel-title">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <h3 style={{margin: "0"}}>Menedżer produktów</h3>
                                    </div>
                                    <div className="col-xs-6">
                                        <button type="button" className="btn btn-primary btn-sm btn-block">
                                            <span className="glyphicon glyphicon-share-alt"/> Wróć do panelu admina
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            {state.products.map(product =>
                                <div>
                                    <div className="row">
                                        <div className="col-xs-2"><img className="img-responsive"
                                                                       src={"http://localhost:8080/resources/mainImages/" + product.id + "/" + product.mainImageName} alt="Zdjecie produktu"/>
                                        </div>
                                        <div className="col-xs-7">
                                            <h4 className="product-name"><strong>{product.name} #{product.id}</strong></h4>
                                            <h4><small>{product.category.name}</small></h4>
                                            <h4><small>{product.description}</small></h4>
                                        </div>
                                        <div className="col-xs-3" style={{marginTop: "2em"}}>
                                            <div className="col-xs-6 text-right">
                                                <h6><strong>{product.price}<span className="text-muted">zł</span></strong></h6>
                                            </div>
                                            <div className="col-xs-2" style={{marginTop: "0.3em"}}>
                                                <button type="button" className="btn btn-link btn-xs">
                                                    <span className="glyphicon glyphicon-trash"> </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            )}
                        </div>
                        <div className="panel-footer">
                            <div className="row text-center">
                               <PaginationBar state={state} setPage={setPage}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductManager;
