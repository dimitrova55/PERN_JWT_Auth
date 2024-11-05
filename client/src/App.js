import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// components
import { Dashboard } from './components/Dashboard';
import { Register } from './components/Register';
import { Login } from './components/Login';

function App() {
  return (<>
  <Router>
    <div className='container'>
      <Switch>
        <Route exact path='/login'></Route>
        <Route exact path='/register'></Route>
        <Route exact path='/dashboard'></Route>
      </Switch>
    </div>
  </Router>
  </>
  );
}

export default App;
