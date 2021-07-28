import './App.css';
import { useSelector } from 'react-redux';
import GlobalLoading from "./pages/GlobalLoading";
import PrivateRoute from "./HOCs/PrivateRoute";
import Header from './components/Header';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import DetailCountry from './pages/DetailCountry';
import News from './pages/News';

import { BrowserRouter, Switch, Route } from "react-router-dom";

const NotFound = () => {
  return (<h1 style={{color: "red", textAlign: "center"}}>Page Not Found</h1>)
}

function App() {
  return (
    <>
      <GlobalLoading />
      <BrowserRouter>
      <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Home}/>
          <PrivateRoute path="/analytics" component={Analytics}/>
          <PrivateRoute path="/country/:countrycode" component={DetailCountry}/>
          <Route path="/news" component={News}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
