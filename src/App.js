import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Use Switch instead of Routes
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Product from './components/Product/Product';
//import SearchResults from './components/SearchResults/SearchResults';
import Profile from './components/Profile/Profile';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/product" component={Product} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          {/* Add more routes as needed */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;