import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Products.css';
import Product from './Product/Product';


const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/products").then(res => res.json()).then(data => setProducts(data))
    }, []);


    console.log(products[0]);
    return (
      <div className="products-wrapper">
          {
              products.map(product =>
                  <div className="product">
                    <Product product={product} />
                  </div>
          )}
      </div>
    );
}

export default Products;