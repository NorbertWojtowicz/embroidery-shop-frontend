import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';

function App() {
  return (
    <Router>
          <NavBar>
            <Routes>
              <Route path="/">

              </Route>
            </Routes>
          </NavBar>
    </Router>
  );
}

export default App;
