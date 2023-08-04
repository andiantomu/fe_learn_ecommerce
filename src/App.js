import React from 'react';
import { Routes, Route } from "react-router-dom";
// note: Switch udah diganti sama Routes di update react-router-dom

// import component
import NavigationBar from './components/navigationBar';

// import pages
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisPage from "./pages/register";

class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Routes>
          <Route path='/' Component={HomePage} exact />
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={RegisPage} />
        </Routes>
      </div>
    );
  }
}

export default App;
