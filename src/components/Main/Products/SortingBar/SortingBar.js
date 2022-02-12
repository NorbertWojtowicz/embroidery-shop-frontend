import "./SortingBar.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

const SortingBar = () => {
    return (
        <section className="sorting-bar-wrapper panel">
            <div className="dropdown sorting-bar">
                <button className="btn dropdown-toggle sorting-bar-menu" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    Sortuj produkty
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="#">Cena rosnąco</a></li>
                    <li><a className="dropdown-item" href="#">Cena malejąco</a></li>
                    <li><a className="dropdown-item" href="#">Od najnowszych</a></li>
                    <li><a className="dropdown-item" href="#">Od najstarszych</a></li>
                    <li><a className="dropdown-item" href="#">Nazwa A-Z</a></li>
                    <li><a className="dropdown-item" href="#">Nazwa Z-A</a></li>
                </ul>
            </div>
    </section>
    );
}

export default SortingBar;
