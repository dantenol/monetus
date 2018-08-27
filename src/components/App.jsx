import React, { Component } from "react";
import axios from "axios";
import "../assets/styles/index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: "",
      data: {}
    };
    this.handleCheckValue = this.handleCheckValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePressEnter = this.handlePressEnter.bind(this);
  }

  handleChange(event) {
    this.setState({ symbol: event.target.value });
  }

  handlePressEnter(event) {
    if (event.keyCode === 13) this.handleCheckValue();
  }

  async handleCheckValue() {
    const { symbol } = this.state;
    const res = await axios(
      `https://api.iextrading.com/1.0/stock/${symbol}/quote`
    );
    this.setState({ data: res.data });
  }

  render() {
    return (
      <div className="container">
        <div className="search">
          <input
            onKeyDown={this.handlePressEnter}
            value={this.state.symbol}
            onChange={this.handleChange}
          />
          <button onClick={this.handleCheckValue}>Ver valor da ação</button>
        </div>
        {this.state.data.latestPrice && (
          <div className="information">
            <div className="name">
              <p>{this.state.data.companyName}&nbsp;</p>
              <span className="symbol">{this.state.data.symbol}</span>
            </div>
            <div className="price">
              <p>${this.state.data.latestPrice}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
