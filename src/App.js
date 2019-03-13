import React, { Component } from 'react';
import './App.css';
import Stocks from './Stocks/Stocks';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Stocks />   
      </div>
    );
  }
}

export default App;
