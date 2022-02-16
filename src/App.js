import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import ProductDetails from "./components/ProductDetails/ProductDetails";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";

function App() {

  return (
    <Router>
          <NavBar/>
            <Routes>
              <Route exact path="/" element={<Main/>}/>
              <Route exact path={`/produkty/:id`} element={<ProductDetails/>}/>
              <Route exact path={"/logowanie"} element={<LoginForm/>}/>
              <Route exact path={"/rejestracja"} element={<RegisterForm/>}/>
            </Routes>
    </Router>
  );
}

export default App;
