import "./SortingBar.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {useState} from "react";

const SortingBar = ({setSortCriteria}) => {
    const [sortName, setSortName] = useState("Sortuj produkty");

    function changeSort(e, sortCriteria) {
        e.preventDefault();
        setSortName(e.target.innerHTML);
        setSortCriteria(sortCriteria);
    }

    return (
        <section className="sorting-bar-wrapper panel">
            <div className="dropdown sorting-bar">
                <button className="btn dropdown-toggle sorting-bar-menu" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    {sortName}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a href={"/"} className="dropdown-item" onClick={(e) => changeSort(e, "asc-price")}>Cena rosnąco</a></li>
                    <li><a href={"/"} className="dropdown-item" onClick={(e) => changeSort(e, "desc-price")}>Cena malejąco</a></li>
                    <li><a href={"/"} className="dropdown-item" onClick={(e) => changeSort(e, "desc-id")}>Od najnowszych</a></li>
                    <li><a href={"/"} className="dropdown-item" onClick={(e) => changeSort(e, "asc-id")}>Od najstarszych</a></li>
                    <li><a href={"/"} className="dropdown-item" onClick={(e) => changeSort(e, "asc-name")}>Nazwa A-Z</a></li>
                    <li><a href={"/"} className="dropdown-item" onClick={(e) => changeSort(e, "desc-name")}>Nazwa Z-A</a></li>
                </ul>
            </div>
    </section>
    );
}

export default SortingBar;
