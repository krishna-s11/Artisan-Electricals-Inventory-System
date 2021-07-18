import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login Page/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import {AuthProvider} from './Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
        <Switch>
          <Route exact path='/' component={LoginPage}/>
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
      </div>
    </AuthProvider>
  );
}

export default App;
