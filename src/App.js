import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login Page/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/dashboard' component={Dashboard}/>
      </Switch>
    </div>
  );
}

export default App;
