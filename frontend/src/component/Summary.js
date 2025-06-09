import { Component } from "react";

class Summary extends Component {
  render() {
    const monthsInYear = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
    const now = new Date();
    const month = now.getMonth();
    return (
      <div>
        <h2>Podsumowanie za miesiąc:{monthsInYear[month]}</h2>
        <h4>Przychody:{this.props.income.sum}</h4>
        <h4>Wydatki:{this.props.cost.sum}</h4>
        <h4>Bilans:{this.props.income.sum - this.props.cost.sum}</h4>
      </div>
    );
  }
}

export default Summary;
