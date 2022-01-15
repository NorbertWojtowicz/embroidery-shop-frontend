import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/">
              
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
