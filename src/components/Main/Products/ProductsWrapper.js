import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './ProductsWrapper.css';
import Product from './Product/Product';
import CategoriesMenu from "./CategoriesMenu/CategoriesMenu";
import SortingBar from "./SortingBar/SortingBar";
import SearchBar from "./SearchBar/SearchBar";
import ErrorMessage from "../../ErrorContainers/ErrorMessage/ErrorMessage";

const ProductsWrapper = () => {
    const [state, setState] = useState({
        products: []
    });
    const [sortCriteria, setSortCriteria] = useState("desc-id");
    let [searchType, setSearchType] = useState("");
    let [searchName, setSearchName] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/products${searchType}${searchName}?sort=${sortCriteria}`).then(res => res.json()).then(data => setState(data));
    }, [sortCriteria, searchType, searchName]);


    console.log("First Product: " + state.products[0]);
    console.log("Sort Criteria: " + sortCriteria);
    console.log("Search Type: " + searchType);
    console.log("Search Name: " + searchName);
    return (
        <div className="main-container">
            <SearchBar setSearchType={setSearchType} setSearchName={setSearchName}/>
            <SortingBar setSortCriteria={setSortCriteria}/>
            <CategoriesMenu setSearchType={setSearchType} setSearchName={setSearchName}/>
          <div className="products-wrapper">
              {
                  state.products.length === 0
                      ? <ErrorMessage message={"Żaden z produktów nie spełnia określonych kryteriów..."}/>
                      : state.products.map(product =>
                          <div className="product" key={product.id}>
                            <Product product={product} />
                          </div>
              )}
          </div>
        </div>
    );
}

export default ProductsWrapper;