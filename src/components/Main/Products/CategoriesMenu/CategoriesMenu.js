import React, { Fragment, useEffect, useState } from "react";
import "./CategoriesMenu.css";
import API_URL from "../../../../Config/API_URL";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";

const CategoriesMenu = ({ setSearchType, setSearchName }) => {
  const [state, setState] = useState({
    categories: [],
    isLoaded: false,
  });
  const [activeCategory, setActiveCategory] = useState(null);
  useEffect(() => {
    fetch(API_URL + "/products/category")
      .then((res) => res.json())
      .then((data) => setState({ categories: data, isLoaded: true }));
  }, [activeCategory]);

  function searchProductsByCategory(e) {
    e.preventDefault();

    setActiveOnElement(e.target);
    setSearchType("/category/");
    setSearchName(e.target.textContent.trim());
  }

  function setActiveOnElement(el) {
    removeActiveTagFromElement(activeCategory);
    setActiveCategory(el);
    el.classList.add("active");
  }

  function removeActiveTagFromElement(el) {
    if (el) {
      el.classList.remove("active");
    }
  }

  return (
    <div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <section className="panel">
        <div className="list-group">
          <a href={"/"} className="list-group-item category-header-wrapper">
            <h5 className="category-header">Kategorie</h5>
          </a>
          {state.isLoaded ? (
            <Fragment>
              {state.categories.map((category) => (
                <a
                  href={"/"}
                  onClick={(e) => searchProductsByCategory(e)}
                  key={category.categoryId}
                  className="list-group-item list-group-item-action"
                >
                  <i className="fa fa-angle-double-right" /> {category.name}
                </a>
              ))}
            </Fragment>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoriesMenu;
