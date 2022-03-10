import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import React from "react";
import AdminPage from "./components/Admin/AdminPage/AdminPage";
import ProductCreator from "./components/Admin/ProductCreator/ProductCreator";
import ProductManager from "./components/Admin/ProductManager/ProductManager";
import ProductEditor from "./components/Admin/ProductEditor/ProductEditor";
import CategoryManager from "./components/Admin/CategoryManager/CategoryManager";
import CategoryEditor from "./components/Admin/CategoryEditor/CategoryEditor";
import CategoryCreator from "./components/Admin/CategoryCreator/CategoryCreator";
import CartManager from "./components/Admin/CartManager/CartManager";
import CartDetails from "./components/Admin/CartDetails/CartDetails";
import ComponentWrapper from "./components/ComponentWrapper/ComponentWrapper";

function App() {
  return (
    <div className="app-container">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path={`/produkty/:id`} element={<ProductDetails />} />
          <Route exact path={"/logowanie"} element={<LoginForm />} />
          <Route exact path={"/rejestracja"} element={<RegisterForm />} />
          <Route
            exact
            path={"/koszyk"}
            element={<ComponentWrapper Component={Cart} />}
          />
          <Route exact path={"/admin/glowna"} element={<AdminPage />} />
          <Route
            exact
            path={"/admin/kreator-produktow"}
            element={<ComponentWrapper Component={ProductCreator} />}
          />
          <Route
            exact
            path={"/admin/menedzer-produktow"}
            element={<ComponentWrapper Component={ProductManager} />}
          />
          <Route
            exact
            path={"/admin/edytor-produktow/:id"}
            element={<ComponentWrapper Component={ProductEditor} />}
          />
          <Route
            exact
            path={"/admin/menedzer-kategorii"}
            element={<ComponentWrapper Component={CategoryManager} />}
          />
          <Route
            exact
            path={"/admin/edytor-kategorii/:id"}
            element={<ComponentWrapper Component={CategoryEditor} />}
          />
          <Route
            exact
            path={"/admin/kreator-kategorii"}
            element={<ComponentWrapper Component={CategoryCreator} />}
          />
          <Route
            exact
            path={"/admin/menedzer-zamowien"}
            element={<ComponentWrapper Component={CartManager} />}
          />
          <Route
            exact
            path={"/admin/menedzer-zamowien/:id"}
            element={<ComponentWrapper Component={CartDetails} />}
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
