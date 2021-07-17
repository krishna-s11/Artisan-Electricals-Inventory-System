import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login Page/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import {AuthProvider} from './Auth';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LoginPage}/>
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
      </div>
    </AuthProvider>
  );
}

export default App;
