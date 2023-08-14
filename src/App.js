import React from 'react';
import { Routes, Route } from "react-router-dom";
// note: Switch udah diganti sama Routes di update react-router-dom
import { connect } from "react-redux";

// import component
import NavigationBar from './components/navigationBar';

// import pages
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisPage from "./pages/register";
import DetailPage from './pages/detail';

// import action
import { keepLogin } from "./redux/actions";

class App extends React.Component {
  componentDidMount() {
    let id = localStorage.getItem('iduser')
    this.props.keepLogin(id)
  }
  render() {
    return (
      <div>
        <NavigationBar />
        <Routes>
          <Route path='/' Component={HomePage} exact />
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={RegisPage} />
          <Route path='/detail/:id' Component={DetailPage} />
          {/* `:id` ini dynamic url */}
        </Routes>
      </div>
    );
  }
}

export default connect(null, {keepLogin})(App);
