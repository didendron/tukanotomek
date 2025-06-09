import { Component } from "react";

class Limit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: 10000,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.cost.sum !== this.props.cost.sum) {
      this.checkCost();
    }
  }
  changeSum = (e) => {
    this.setState({ sum: e.target.value });
  };
  checkCost = () => {
    if (this.props.cost.sum > this.state.sum) {
      alert("Przekroczony limit kosztów w tym miesiącu");
    }
  };
  render() {
    return (
      <div>
        <div className="input-group mb-3">
          <span className="input-group-text">Limit miesięczny kosztów[zł]</span>
          <input
            type="number"
            className="form-control"
            value={this.state.sum}
            onChange={this.changeSum}
            onBlur={this.checkCost}
          />
        </div>
      </div>
    );
  }
}

export default Limit;
