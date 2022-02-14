import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
          <NavBar/>
            <Routes>
              <Route exact path="/" element={<Main/>}>
              </Route>
            </Routes>
    </Router>
  );
}

export default App;
