import './App.css';
//路由
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import MainPage  from "./component/MainPage/index"
import Login  from "./pages/login/index"
import Register from "./pages/register/index"

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
      <Switch>
        <Route exact path = "/" component = {MainPage}/>
        <Route path = "/home" component = {MainPage}/>
        <Route path = "/login" component = {Login}/>
        <Route path = "/register" component = {Register}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
