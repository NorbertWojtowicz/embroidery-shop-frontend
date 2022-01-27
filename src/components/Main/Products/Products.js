import React, {useState, useEffect} from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/products").then(res => res.json()).then(data => setProducts(data))
    }, []);

    return (
      <div className="products-wrapper">
          {products.map(product => product.name)}
      </div>
    );
}

export default Products;