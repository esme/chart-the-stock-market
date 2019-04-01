import React, { Component } from 'react';
import axios from '../axios-stocks';
import NewStock from './NewStock';

let Chart = require("chart.js");

const PATH_BASE = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=';
// const DEFAULT_QUERY = 'MSFT';
const API_KEY = '&apikey=PVY8MCGPGIBP69X4';
// const url = `${PATH_BASE}${DEFAULT_QUERY}${API_KEY}`;

class Stocks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 12,
      dates: [],
      datasets: [],
      loaded: false,
    }
  }

  componentDidMount() {
    console.log('ComponentDidMount', this);
    axios.get('/stocks.json')
      .then(result => {
        console.log('data', result.data)
        const keys = Object.keys(result.data)
        keys.forEach(key => {
          const stock = result.data[key]['stock'];
          const colorArray = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];
          const colorIndex = keys.indexOf(key) % (colorArray.length + 1);
          const color = colorArray[colorIndex];
          axios.get(`${PATH_BASE}${stock}${API_KEY}`)
            .then(result => this.displayStock(result.data, stock, color))
            .catch(error => console.log(error))
        });
      })
      .then(this.setState({ loaded: true }))
  }

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate', prevProps);
  }

  displayStock(result, stock, color) {
    const { duration, datasets } = this.state;
    let keys = Object.keys(result['Monthly Time Series']);
    let dates = [];
    let pricesClose = [];
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    for (let i=0; i<duration; i++) {
      let key = keys[i];
      pricesClose.push(result['Monthly Time Series'][key]['4. close']);
      dates.push(months[Number(key.slice(5, 7) - 1)] + key.slice(2, 4));
    }
    // this.setState({ stockArray: [...stockArray, stock] })
    this.setState({ dates });
    this.setState({ datasets: 
      [...datasets, {
        label: stock,
        borderColor: color,
        data: pricesClose,
        backgroundColor: 'transparent',
        lineTension: 0,
      }]
    });
  }

  showChart() {
    console.log('show chart', this.state);
    const node = this.node;

    new Chart(node, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: this.state.dates.reverse(),
          datasets: this.state.datasets,
      },

      // Configuration options go here
      options: {}
    });
  }

  render() {
    if(this.state.loaded) {
      this.showChart()
    }
    return (
      <div>
        <h1 className="f4">Stock Prices</h1>
        <canvas
          style={{ width: 800, height: 250 }}
          ref={node => (this.node = node)}/>
        <div className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
          <NewStock />
        </div>
      </div>
    );
  }
}

export default Stocks;
