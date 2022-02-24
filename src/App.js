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
            </Routes>
          <Footer/>
    </Router>
  );
}

export default App;
