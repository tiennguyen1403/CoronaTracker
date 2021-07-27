import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highchart from "highcharts";
import moment from "moment";

const generateOptions = (data) => {
  const categories = Object.keys(data.cases).map((item) =>
    moment(item).format("DD/MM/YY")
  );
  return {
    chart: {
      height: 500,
    },
    title: {
      text: "Overview Chart",
      align: "center",
      style: { fontWeight: "bold" },
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    colors: ["#F3585B", "#38A169", "#718096"],
    tooltip: {
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
      series: {
        events: {
          legendItemClick: function () {
            if (this.visible) {
              var count = 0;
              for (var index in this.chart.series) {
                if (this.chart.series[index].visible) {
                  count = count + 1;
                  if (count > 1) break;
                }
              }
              if (count === 1) return false;
            }
          },
        },
      },
    },
    series: [
      {
        name: "Cases",
        data: Object.values(data.cases),
      },
      {
        name: "Recovered",
        data: Object.values(data.recovered),
      },
      {
        name: "Deaths",
        data: Object.values(data.deaths),
      },
    ],
  };
};

function LineChart({ historyInfo }) {
  const [options, setOptions] = useState({});
  useEffect(() => {
    setOptions(generateOptions(historyInfo));
  }, [historyInfo]);
  return (
    <div className="analytics__line-chart">
      <HighchartsReact highcharts={Highchart} options={options} />
    </div>
  );
}

export default LineChart;
