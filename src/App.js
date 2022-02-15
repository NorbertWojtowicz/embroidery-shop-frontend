import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {

  return (
    <Router>
          <NavBar/>
            <Routes>
              <Route exact path="/" element={<Main/>}>
              </Route>
              <Route exact path={`/produkty/:id`} element={<ProductDetails/>}>
              </Route>
            </Routes>
    </Router>
  );
}

export default App;
