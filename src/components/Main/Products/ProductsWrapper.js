import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./ProductsWrapper.css";
import Product from "./Product/Product";
import CategoriesMenu from "./CategoriesMenu/CategoriesMenu";
import SortingBar from "./SortingBar/SortingBar";
import SearchBar from "./SearchBar/SearchBar";
import ErrorMessage from "../../ErrorContainers/ErrorMessage/ErrorMessage";
import PaginationBar from "./PaginationBar/PaginationBar";
import SuccessMessage from "../../ErrorContainers/SuccessMessage/SuccessMessage";
import API_URL from "../../../Config/API_URL";

const ProductsWrapper = () => {
  const [state, setState] = useState({
    products: [],
    currentPage: 1,
  });

  const [sortCriteria, setSortCriteria] = useState("desc-id");
  let [searchType, setSearchType] = useState("");
  let [searchName, setSearchName] = useState("");
  let [page, setPage] = useState(state.currentPage);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(
      API_URL +
        `/products${searchType}${searchName}?sort=${sortCriteria}&page=${
          page - 1
        }`
    )
      .then((res) => res.json())
      .then((data) => setState(data));
  }, [sortCriteria, searchType, searchName, page]);

  return (
    <div className="main-container" id="produkty">
      <SearchBar setSearchType={setSearchType} setSearchName={setSearchName} />
      <SortingBar setSortCriteria={setSortCriteria} />
      <CategoriesMenu
        setSearchType={setSearchType}
        setSearchName={setSearchName}
      />
      {state.products.length === 0 ? (
        <ErrorMessage
          message={"Żaden z produktów nie spełnia określonych kryteriów..."}
        />
      ) : (
        <div>
          {message !== "" ? <SuccessMessage message={message} /> : ""}
          <div className="products-wrapper">
            {state.products.map((product) => (
              <div className="product" key={product.id}>
                <Product product={product} setMessage={setMessage} />
              </div>
            ))}
          </div>
        </div>
      )}
      {/*Grid helper div*/}
      <div></div>
      <PaginationBar state={state} setPage={setPage} />
    </div>
  );
};

export default ProductsWrapper;
