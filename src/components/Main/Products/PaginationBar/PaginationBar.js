import "./PaginationBar.css";
import { useEffect, useState, Fragment } from "react";

const PaginationBar = ({ state, setPage }) => {
  const [activePage, setActivePage] = useState(1);
  let currentPage = state.currentPage < 3 ? 3 : state.currentPage;
  currentPage = currentPage > 7 ? 7 : currentPage;
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const totalPages = state.totalPages;

  const nextPageReal = state.currentPage + 1;
  const previousPageReal = state.currentPage - 1;

  useEffect(() => {
    document.querySelector(".page" + activePage).classList.add("active");
  }, [activePage, state.currentPage]);

  function changePage(e, page) {
    e.preventDefault();
    if (page > totalPages || page < 1) return;
    if (page === activePage) return;
    removeActiveTagFromPageElement(".page" + activePage);
    setActivePage(page);
    setPage(page);
  }

  function removeActiveTagFromPageElement(pageClass) {
    const el = document.querySelector(pageClass);
    el.classList.remove("active");
  }

  return (
    <section className="panel blue-wrapper pagination-wrapper top-margin-3">
      <div className="pagination pagination-bar">
        <li
          className="page-item previous-btn"
          onClick={(e) => changePage(e, previousPageReal)}
        >
          <a className="page-link" href="/">
            Poprzednia
          </a>
        </li>
        <li className="page-item page1" onClick={(e) => changePage(e, 1)}>
          <a className="page-link" href="/">
            1
          </a>
        </li>
        {totalPages > 2 ? (
          <Fragment>
            <li className="page-item disabled">
              <a className="page-link" href="/">
                ...
              </a>
            </li>
            <li
              className={`page-item page${previousPage}`}
              onClick={(e) => changePage(e, previousPage)}
            >
              <a className="page-link" href="/">
                {previousPage}
              </a>
            </li>
          </Fragment>
        ) : (
          ""
        )}
        {totalPages > 3 ? (
          <li
            className={`page-item page${currentPage}`}
            onClick={(e) => changePage(e, currentPage)}
          >
            <a className="page-link" href="/">
              {currentPage}
            </a>
          </li>
        ) : (
          ""
        )}
        {totalPages > 4 ? (
          <li
            className={`page-item page${nextPage}`}
            onClick={(e) => changePage(e, nextPage)}
          >
            <a className="page-link" href="/">
              {nextPage}
            </a>
          </li>
        ) : (
          ""
        )}
        {totalPages > 1 ? (
          <Fragment>
            <li className="page-item disabled">
              <a className="page-link" href="/">
                ...
              </a>
            </li>
            <li
              className={`page-item page${totalPages}`}
              onClick={(e) => changePage(e, totalPages)}
            >
              <a className="page-link" href="/">
                {totalPages}
              </a>
            </li>
          </Fragment>
        ) : (
          ""
        )}
        <li
          className="page-item next-btn"
          onClick={(e) => changePage(e, nextPageReal)}
        >
          <a className="page-link" href="/">
            Następna
          </a>
        </li>
      </div>
    </section>
  );
};

export default PaginationBar;
