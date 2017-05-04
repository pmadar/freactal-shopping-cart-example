import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Cart extends Component {
  render() {
    return (
      <div className="Cart">
        <div className="Cart-header">
          <img src={logo} className="Cart-logo" alt="logo" />
        </div>
        <p className="Cart-intro">
          To get started, edit <code>src/Cart.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Cart;
