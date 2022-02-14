import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './ProductsWrapper.css';
import Product from './Product/Product';
import CategoriesMenu from "./CategoriesMenu/CategoriesMenu";
import SortingBar from "./SortingBar/SortingBar";
import SearchBar from "./SearchBar/SearchBar";
import ErrorMessage from "../../ErrorContainers/ErrorMessage/ErrorMessage";
import PaginationBar from "./PaginationBar/PaginationBar";

const ProductsWrapper = () => {
    const [state, setState] = useState({
        products: [],
        currentPage: 1
    });
    const [sortCriteria, setSortCriteria] = useState("desc-id");
    let [searchType, setSearchType] = useState("");
    let [searchName, setSearchName] = useState("");
    let [page, setPage] = useState(state.currentPage);
    console.log("Page: " + state.currentPage);
    console.log("Total pages: " + state.totalPages);

    useEffect(() => {
        fetch(`http://localhost:8080/products${searchType}${searchName}?sort=${sortCriteria}&page=${page - 1}`).then(res => res.json()).then(data => setState(data));
    }, [sortCriteria, searchType, searchName, page]);


    console.log("First Product: " + state.products[0]);
    console.log("Sort Criteria: " + sortCriteria);
    console.log("Search Type: " + searchType);
    console.log("Search Name: " + searchName);
    return (
        <div className="main-container" id="produkty">
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
            <PaginationBar state={state} setPage={setPage}/>
        </div>
    );
}

export default ProductsWrapper;