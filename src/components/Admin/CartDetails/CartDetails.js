import './CartDetails.css';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const CartDetails = () => {

    const {id} = useParams();
    const token = decodeURI(document.cookie.split("=")[1]);
    const navigate = useNavigate();

    const [state, setState] = useState({
        cart: {},
        message: "",
        isLoaded: false,
        isAdmin: false,
    });

    useEffect(() => {
        async function fetchData() {
            let isAdminTemp = false;
            await axios.get("http://localhost:8080/profile/details", {
                headers: {'Authorization': token}
            }).then(res => {isAdminTemp = res.data.roles.includes("ADMIN")});
            await axios.get(`http://localhost:8080/cart/${id}`,
                {headers: {"Authorization": token}})
                .then(res => setState({cart: res.data, message: "", isLoaded: true, isAdmin: isAdminTemp}))
                .catch();
        }
        fetchData();
    }, [id, token])

    function backToCartManager() {
        navigate("/admin/menedzer-zamowien");
    }

    function completeOrder(id) {
        if (state.cart.completed) {
            setState({cart: state.cart, isLoaded: true,
                message: "Zamówienie jest już zakończone", isAdmin: state.isAdmin});
        } else {
            axios.post(`http://localhost:8080/cart/complete/${id}`, {},
                {headers: {"Authorization": token}})
                .then(res => setState({cart: state.cart, isLoaded: true,
                    message: "Zamówienie zostało zakończone", isAdmin: state.isAdmin}))
                .catch(err => setState({cart: state.cart, isLoaded: true,
                    message: "Nie można zakończyć zamówienia", isAdmin: state.isAdmin}));
        }
    }

    return (
        <div className="container">
            {state.isLoaded && state.isAdmin ? <div>
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
                                                <h3 style={{margin: "0"}}>
                                                    <strong>
                                                        Zamówienie nr #{state.cart.id}
                                                    </strong>
                                                </h3>
                                        </div>
                                        <div className="col-xs-3">
                                            <button type="button" className="btn btn-primary btn-sm btn-block"
                                                    onClick={() => backToCartManager()}>
                                                <span className="glyphicon glyphicon-share-alt"/> Wróć do zamówień
                                            </button>
                                        </div>
                                        <div className="col-xs-3">
                                            <button type="button" className="btn btn-success btn-sm btn-block"
                                                    onClick={() => completeOrder(state.cart.id)}>
                                                <span className="glyphicon glyphicon-share-alt"/> Zakończ zamówienie
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                {state.cart.cartItems.map(cartItem =>
                                    <div key={cartItem.id}>
                                        <div className="row">
                                            <div className="col-xs-2">
                                                <img className="img-responsive"
                                                     src={"http://localhost:8080/resources/mainImages/"
                                                         + cartItem.id + "/" + cartItem.product.mainImageName}
                                                     alt="Zdjecie produktu"/>
                                            </div>
                                            <div className="col-xs-7">
                                                <h4 className="product-name">
                                                    <strong>
                                                        {cartItem.product.name} #{cartItem.id}
                                                    </strong>
                                                </h4>
                                                <h4><small>{cartItem.product.category.name}</small></h4>
                                                <h4><small>{cartItem.product.description}</small></h4>
                                            </div>
                                            <div className="col-xs-3" style={{marginTop: "2em"}}>
                                                <div className="col-xs-6 text-right">
                                                    <h6>
                                                        <strong>
                                                            {cartItem.product.price}
                                                            <span className="text-muted">zł</span>
                                                        </strong>
                                                    </h6>
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
            </div> : "Coś poszło nie tak..."}
        </div>
    )
}

export default CartDetails;
