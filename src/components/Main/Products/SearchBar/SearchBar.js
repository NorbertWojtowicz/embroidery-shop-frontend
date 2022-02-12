import './SearchBar.css';

const SearchBar = () => {
    return (
        <section className="panel search-bar">
            <div className="panel-body">
                <input type="text" placeholder="Szukaj produktu..." className="form-control"/>
            </div>
        </section>
    );
}

export default SearchBar;
