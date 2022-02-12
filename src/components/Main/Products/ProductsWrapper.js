import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './ProductsWrapper.css';
import Product from './Product/Product';
import CategoriesMenu from "./CategoriesMenu/CategoriesMenu";
import SortingBar from "./SortingBar/SortingBar";
import SearchBar from "./SearchBar/SearchBar";

const ProductsWrapper = () => {
    const [products, setProducts] = useState([{}]);
    const [sortCriteria, setSortCriteria] = useState("desc-id");
    let [searchType, setSearchType] = useState("");
    let [searchProductName, setSearchProductName] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/products${searchType}${searchProductName}?sort=${sortCriteria}`).then(res => res.json()).then(data => setProducts(data));
    }, [sortCriteria, searchType, searchProductName]);


    console.log(products[0]);
    console.log(sortCriteria);
    console.log(searchType);
    console.log(searchProductName);
    return (
        <div className="main-container">
            <SearchBar setSearchType={setSearchType} setSearchProductName={setSearchProductName}/>
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