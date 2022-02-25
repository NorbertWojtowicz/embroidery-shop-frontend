import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
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

function App() {

  return (
    <Router>
          <NavBar/>
            <Routes>
              <Route exact path="/" element={<Main/>}/>
              <Route exact path={`/produkty/:id`} element={<ProductDetails/>}/>
              <Route exact path={"/logowanie"} element={<LoginForm/>}/>
              <Route exact path={"/rejestracja"} element={<RegisterForm/>}/>
              <Route exact path={"/koszyk"} element={<Cart/>}/>
              <Route exact path={"/admin/glowna"} element={<AdminPage/>}/>
              <Route exact path={"/admin/kreator-produktow"} element={<ProductCreator/>}/>
              <Route exact path={"/admin/menedzer-produktow"} element={<ProductManager/>}/>
              <Route exact path={"/admin/edytor-produktow/:id"} element={<ProductEditor/>}/>
              <Route exact path={"/admin/menedzer-kategorii"} element={<CategoryManager/>}/>
              <Route exact path={"/admin/edytor-kategorii/:id"} element={<CategoryEditor/>}/>
              <Route exact path={"/admin/kreator-kategorii"} element={<CategoryCreator/>}/>
              <Route exact path={"/admin/menedzer-zamowien"} element={<CartManager/>}/>
            </Routes>
          <Footer/>
    </Router>
  );
}

export default App;
