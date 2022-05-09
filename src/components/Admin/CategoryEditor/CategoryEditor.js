import "./CategoryEditor.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CookieUtil from "../../../CookieUtil/CookieUtil";
import axiosApiInstance from "../../../Config/AxiosApiInstance";
import API_URL from "../../../Config/API_URL";
import LoadingSpinnerGrow from "../../LoadingSpinnerGrow/LoadingSpinnerGrow";

const CategoryEditor = ({ setMessage }) => {
  const { id } = useParams();
  const token = CookieUtil.getCookie("access_token");
  const navigate = useNavigate();
  // if put request is processing
  const [isLoaded, setLoaded] = useState(true);

  const [state, setState] = useState({
    category: {},
    // if product found and fetched from db
    isLoaded: false,
    isAdmin: false,
  });

  useEffect(() => {
    async function fetchData() {
      let isAdminTemp = false;
      await axiosApiInstance
        .get(API_URL + "/profile/details", {
          headers: { Authorization: token },
        })
        .then((res) => {
          isAdminTemp = res.data.roles.includes("ADMIN");
        });
      let categories = [];
      await axiosApiInstance
        .get(API_URL + `/products/category`)
        .then((res) => {
          categories = res.data;
        })
        .catch();
      for (const cat of categories) {
        if (cat.categoryId === Number(id)) {
          setState({ category: cat, isLoaded: true, isAdmin: isAdminTemp });
          break;
        }
      }
    }
    fetchData();
  }, [id, token]);

  function backToCategoryManager() {
    setMessage("");
    navigate("/admin/menedzer-kategorii");
  }

  async function editCategory(e) {
    e.preventDefault();
    setLoaded(false);
    const categoryForm = document.querySelector("#category-form");
    const modifiedCategory = {
      categoryId: state.category.categoryId,
      name: categoryForm.name.value,
    };
    await axiosApiInstance
      .put(API_URL + "/products/category", modifiedCategory, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setMessage("Edycja przebiegła pomyślnie");
        setState({
          category: res.data,
          isLoaded: true,
          isAdmin: state.isAdmin,
        });
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setState({
          category: state.category,
          isLoaded: true,
          isAdmin: state.isAdmin,
        });
      });
    setLoaded(true);
  }

  return (
    <div>
      {state.isLoaded && state.isAdmin ? (
        <div className="product-creator">
          <form id="category-form">
            <button
              type="button"
              className="btn btn-primary btn-sm btn-block"
              style={{ margin: "0" }}
              onClick={() => backToCategoryManager()}
            >
              <span className="glyphicon glyphicon-share-alt" /> Wróć do
              menedżera kategorii
            </button>
            <h1>Edytuj Kategorię</h1>
            <div className="form-group">
              <label htmlFor="name">Nazwa kategorii</label>
              <input
                type="text"
                className="form-control"
                id="name"
                defaultValue={state.category.name}
                onFocus={() => setMessage("")}
              />
            </div>

            {isLoaded ? (
              <button
                type="submit"
                className="btn btn-primary form-control"
                onClick={(e) => editCategory(e)}
              >
                Edytuj kategorię
              </button>
            ) : (
              <span style={{ textAlign: "center" }}>
                <LoadingSpinnerGrow />
              </span>
            )}
          </form>
        </div>
      ) : (
        <div>Nie ma takiej kategorii...</div>
      )}
    </div>
  );
};

export default CategoryEditor;
