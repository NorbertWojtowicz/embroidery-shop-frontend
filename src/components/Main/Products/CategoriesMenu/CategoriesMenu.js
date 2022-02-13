import React, {useEffect, useState} from "react";
import './CategoriesMenu.css';

const CategoriesMenu = ({setSearchType, setSearchName}) => {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    useEffect(() => {
        console.log("Fetching...");
        fetch("http://localhost:8080/products/category").then(res => res.json()).then(data => setCategories(data));
    }, []);

    function searchProductsByCategory(e) {
        e.preventDefault();
        setActiveOnElement(e.target);
        setSearchType("/category/");
        setSearchName(e.target.textContent.trim());
    }

    function setActiveOnElement(el) {
        if (activeCategory) {
            activeCategory.classList.remove("active");
        }
        setActiveCategory(el);
        el.classList.add("active");
    }

    return (
        <div>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
            <section className="panel">
                <div className="list-group">
                    <a href={"/"} className="list-group-item category-header-wrapper">
                        <h5 className="category-header">Kategorie</h5>
                    </a>
                    {
                        categories.map(category =>
                            <a href={"/"} onClick={(e) => searchProductsByCategory(e)} key={category.categoryId} className="list-group-item list-group-item-action">
                                <i className="fa fa-angle-double-right"/> {category.name}
                            </a>
                        )
                    }
                </div>
            </section>
        </div>
    )
}

export default CategoriesMenu;
