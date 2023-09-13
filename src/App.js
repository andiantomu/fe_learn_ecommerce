import React from 'react';
import { Routes, Route } from "react-router-dom";
// note: Switch udah diganti sama Routes di update react-router-dom
import { connect } from "react-redux";

// import component
import NavigationBar from './components/navigationBar';
import Footer from './components/footer';

// import pages
import HomePage from "./pages/home";
import ProductPage from "./pages/product";
import LoginPage from "./pages/login";
import RegisPage from "./pages/register";
import DetailPage from './pages/detail';
import CartPage from "./pages/cart";
import HistoryPage from "./pages/history";
import NotFoundPage from "./pages/pagenotfound";

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
        {this.props.userRole === "admin" ?
        <Routes>
          <Route path='/' Component={HomePage} exact />
          <Route path='/products' Component={ProductPage} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={RegisPage} />
          <Route path='/detail/:id' Component={DetailPage} />
          {/* `:id` ini dynamic url */}
          <Route path='/history' Component={HistoryPage} />
          <Route path='*' Component={NotFoundPage} />
        </Routes> :
        <Routes>
          <Route path='/' Component={HomePage} exact />
          <Route path='/products' Component={ProductPage} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/register' Component={RegisPage} />
          <Route path='/detail/:id' Component={DetailPage} />
          {/* `:id` ini dynamic url */}
          <Route path='/cart' Component={CartPage} />
          <Route path='/history' Component={HistoryPage} />
          <Route path='*' Component={NotFoundPage} />
        </Routes> }
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      userRole: state.userReducer.role
  }
}

export default connect(mapStateToProps, {keepLogin})(App);
