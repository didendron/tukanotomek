import "./App.css";
import "./component/Transaction.js";
import { Component } from "react";
import Transaction from "./component/Transaction.js";
import PieChart from "./component/PieChart.js";
import { variables } from "./component/Variable";
import BarChart from "./component/BarChart.js";
import Summary from "./component/Summary.js";
import Limit from "./component/Limit.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      months: [],
      income: {},
      cost: {},
    };
  }

  componentDidMount() {
    this.downloadMonthList();
    this.downloadCategoryList();
    this.downloadIncomeForMonth();
    this.downloadCostForMonth();
  }

  downloadCategoryList = () => {
    fetch(variables.API_URL + "cost/categories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  };
  downloadMonthList = () => {
    fetch(variables.API_URL + "cost/months")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ months: data });
      });
  };
  downloadIncomeForMonth = () => {
    const now = new Date();
    const actualMonth = now.getMonth() + 1;
    const url = variables.API_URL + "income/months/" + actualMonth;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ income: data }, () => {
          console.log(this.state.income);
        });
      });
  };
  downloadCostForMonth = () => {
    const now = new Date();
    const actualMonth = now.getMonth() + 1;
    const url = variables.API_URL + "cost/months/" + actualMonth;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ cost: data }, () => {
          console.log(this.state.cost);
        });
      });
  };
  handleDataChanged = () => {
    this.downloadCategoryList();
    this.downloadMonthList();
    this.downloadIncomeForMonth();
    this.downloadCostForMonth();
  };
  render() {
    return (
      <div className="App container">
        <h1>Tukan Tomek i domowy skarbiec</h1>
        <Transaction
          trans="income"
          name="przychód"
          onDataChanged={this.handleDataChanged}
        />
        <Limit cost={this.state.cost} />
        <Transaction
          trans="cost"
          name="koszt"
          onDataChanged={this.handleDataChanged}
        />
        <Summary income={this.state.income} cost={this.state.cost} />
        <div className="mt-5">
          <h2>Statystyki</h2>
        </div>
        <PieChart categories={this.state.categories} />
        <BarChart months={this.state.months} />
      </div>
    );
  }
}

export default App;
