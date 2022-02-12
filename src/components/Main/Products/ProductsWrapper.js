import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './ProductsWrapper.css';
import Product from './Product/Product';
import CategoriesMenu from "./CategoriesMenu/CategoriesMenu";
import SortingBar from "./SortingBar/SortingBar";
import SearchBar from "./SearchBar/SearchBar";

const ProductsWrapper = () => {
    const [products, setProducts] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("desc-id");
    useEffect(() => {
        fetch(`http://localhost:8080/products?sort=${sortCriteria}`).then(res => res.json()).then(data => setProducts(data));
    }, [sortCriteria]);


    console.log(products[0]);
    console.log(sortCriteria);
    return (
        <div className="main-container">
            <SearchBar/>
            <SortingBar setSortCriteria={setSortCriteria}/>
            <CategoriesMenu/>
          <div className="products-wrapper">
              {
                  products.map(product =>
                      <div className="product" key={product.id}>
                        <Product product={product} />
                      </div>
              )}
          </div>
        </div>
    );
}

export default ProductsWrapper;