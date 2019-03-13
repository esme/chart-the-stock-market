import React, { Component } from 'react';
import axios from '../axios-stocks';

class NewStock extends Component {
  state = {
    stock: null,
  }
  
  handleChange = (event) => {
    this.setState({ stock: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { stock } = this.state;
    axios.post('/stocks.json', {"stock": stock})
      .then(response => console.log(response))
      .catch(error => console.log(error))
  };

  render() {
    return (
      <div className="bt b--black-10 h4">
      <p>Syncs in realtime across clients</p>
        <p className="f6 f5-ns lh-copy measure"></p>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Stock symbol"
            onChange={this.handleChange}></input>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default NewStock;