import React from 'react';
import {Col, Row, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';
import ProductsWrapper from "./Products/ProductsWrapper";
import Footer from "../Footer/Footer";

const Main = () => {
    return (
        <div id="main-wrapper">
            <div className='main-container'>
                <div id='top-section-wrapper'>
                    <Row>
                        <Col className='top-section'>
                            <h1 className='display-5'>Personalizowane hafty na każdą okazję</h1>
                            <h4>Szeroki katalog produktów zawierający m.in poduszki, pluszaki. </h4>
                            <Button className='check-btn btn-lg' href="#produkty">Sprawdź katalog</Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <ProductsWrapper/>
            <Footer/>
        </div>
    );
}

export default Main;