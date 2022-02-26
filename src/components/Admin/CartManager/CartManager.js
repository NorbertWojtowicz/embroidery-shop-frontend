import './CartManager.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CartManager = () => {

    const navigate = useNavigate();
    const token = decodeURI(document.cookie.split("=")[1]);

    const [state, setState] = useState({
        carts: [],
        message: "",
        isLoaded: false,
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/cart/all`, {headers: {"Authorization": token}})
            .then(res => setState({message: "", carts: res.data, isLoaded: true}));
    }, [token]);

    function backToAdminPage() {
        navigate("/admin/glowna");
    }

    function openCartDetails(id) {
        navigate(`/admin/menedzer-zamowien/${id}`);
    }

    function completeOrder(cart) {
        if (cart.completed) {
            setState({carts: state.carts, isLoaded: true, message: "Zamówienie jest już zakończone"});
        } else {
            axios.post(`http://localhost:8080/cart/complete/${cart.id}`, {},
                {headers: {"Authorization": token}})
                .then(res => setState({carts: state.carts, isLoaded: true, message: "Zamówienie zostało zakończone"}))
                .catch(err => setState({carts: state.carts, isLoaded: true, message: "Nie można zakończyć zamówienia"}));
        }
    }

    return (
        <div className="container">
            {state.isLoaded ?
                <div>
                    {state.message !== "" ?
                        <div className="alert alert-info alert-cart" role="alert" style={{margin: "1em auto"}}>
                            {state.message}
                        </div>
                        : ""}
                    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css"
                          rel="stylesheet" id="bootstrap-css"/>
                    <div className="row">
                        <div className="col-xs-8">
                            <div className="panel panel-info" style={{width: "100%"}}>
                                <div className="panel-heading">
                                    <div className="panel-title">
                                        <div className="row">
                                            <div className="col-xs-6">
                                                <h3 style={{margin: "0"}}>Menedżer zamówień</h3>
                                            </div>
                                            <div className="col-xs-6">
                                                <button type="button" className="btn btn-primary btn-sm btn-block"
                                                        onClick={() => backToAdminPage()}>
                                                    <span className="glyphicon glyphicon-share-alt"/>
                                                    Wróć do panelu admina
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-body">
                                    {state.carts.map(cart =>
                                        <div key={cart.id}>
                                            <div className="row">
                                                <div className="col-xs-2">
                                                    <img className="img-responsive"
                                                         src={"http://localhost:8080/resources/" +
                                                             (cart.completed ? "check" : "cross") + ".png"}
                                                         alt="Zdjecie produktu"/>
                                                </div>
                                                <div className="col-xs-5">
                                                    <h4 className="product-name">
                                                        <strong>{cart.user.username} #{cart.id}</strong>
                                                    </h4>
                                                    <h4>
                                                        <small>{cart.user.email}</small>
                                                    </h4>
                                                    <button type="button" className="btn btn-primary btn-sm btn-block"
                                                            onClick={
                                                        () => openCartDetails(cart.id)} style={{margin: "0"}
                                                    }>
                                                        <span className="glyphicon glyphicon-info-sign"/> Szczegóły zamówienia
                                                    </button>
                                                    <button type="button" className="btn btn-success btn-sm btn-block"
                                                            onClick={() => completeOrder(cart)}
                                                            style={{margin: "2em auto 0 auto", width: "70%"}}>
                                                        <span className="glyphicon glyphicon-check"/> Zakończ zamówienie
                                                    </button>
                                                </div>
                                                <div className="col-xs-5" style={{marginTop: "2em"}}>
                                                    <h5>Całkowita cena zamówienia</h5>
                                                    <div className="col-xs-9 text-center">
                                                        <h5>
                                                            <strong>{cart.totalPrice}
                                                                <span className="text-muted">zł</span>
                                                            </strong>
                                                        </h5>
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
                : ""}
        </div>
    )
}

export default CartManager;
