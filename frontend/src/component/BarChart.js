import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class BarChart extends Component {
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
    const dataPoints = this.props.months.map((item) => {
      return {
        y: item.sum,
        label: monthsInYear[item.month],
      };
    });
    const options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Wydatki w podziale na miesiące",
      },
      axisX: {
        title: "Miesiące",
        reversed: true,
      },
      axisY: {
        title: "Wydatki",
        includeZero: true,
        labelFormatter: this.addSymbols,
      },
      data: [
        {
          type: "bar",
          dataPoints,
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
  addSymbols(e) {
    return CanvasJS.formatNumber(e.value) + "zł";
  }
}
export default BarChart;
