import { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class PieChart extends Component {
  render() {
    const total = this.props.categories.reduce(
      (acc, curr) => acc + curr.sum,
      0
    );
    const dataPoints = this.props.categories.map((item) => {
      const percent = ((item.sum / total) * 100).toFixed(1);
      return {
        y: `${percent}`,
        label: `${item.category}`,
      };
    });
    const options = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Koszty w podziale na kategorie",
      },
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
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
}
export default PieChart;
