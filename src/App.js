import './App.css';
import { useSelector } from 'react-redux';
import { ThemeProvider } from "styled-components";
import GlobalLoading from "./pages/GlobalLoading";
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import DetailCountry from './pages/DetailCountry';
import News from './pages/News';
import Global, { lightTheme, darkTheme } from "./theme";

import { BrowserRouter, Switch, Route } from "react-router-dom";

const NotFound = () => {
  return (<h1 style={{color: "red", textAlign: "center"}}>Page Not Found</h1>)
}

function App() {
  const darkMode = useSelector(state => state.GlobalReducer.darkMode);
  return (
    <>
      <ThemeProvider theme={darkMode ? lightTheme : darkTheme}>
        <Global />
        <GlobalLoading />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/analytics" component={Analytics}/>
            <Route path="/country/:countrycode" component={DetailCountry}/>
            <Route path="/news" component={News}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
