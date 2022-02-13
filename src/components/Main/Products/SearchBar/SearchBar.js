import './SearchBar.css';

const SearchBar = ({setSearchType, setSearchName}) => {

    function searchProduct(e) {
        e.preventDefault();
        const inputValue = document.querySelector(".search-bar-input").value;
        if (inputValue.length === 0) return;
        if (isNaN(inputValue) && !inputValue.match(/[a-z]/i)) return;
        setSearchType("/search/");
        setSearchName(inputValue);
    }

    return (
        <section className="panel search-bar-wrapper">
            <form className="panel-body" id="szukaj">
                <input type="text" placeholder="Nazwa produktu..." className="form-control search-bar-input"/>
                <button className="btn btn-outline-primary search-btn" id="search-btn-id" type="submit" onClick={(e) => searchProduct(e)}>Szukaj</button>
            </form>
        </section>
    );
}

export default SearchBar;
