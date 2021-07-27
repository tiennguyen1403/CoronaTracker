import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highchart from "highcharts";

const generateOptions = (detailHistory) => {
  const categories = Object.keys(detailHistory.cases)
    .reverse()
    .slice(0, 14)
    .reverse();
  const casesHistory = Object.values(detailHistory.cases)
    .reverse()
    .slice(0, 14)
    .reverse();
  const recoveredHistory = Object.values(detailHistory.recovered)
    .reverse()
    .slice(0, 14)
    .reverse();
  const deathsHistory = Object.values(detailHistory.deaths)
    .reverse()
    .slice(0, 14)
    .reverse();
  return {
    chart: {
      height: 500,
      type: "column",
    },
    title: {
      text: "Past 14 Days Chart",
      align: "center",
      style: { fontWeight: "bold" },
    },
    xAxis: {
      categories: categories,
      crosshair: true,
      min: 0,
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    colors: ["#fec85e", "#68eec1", "#68bdfd"],
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
        stacking: "normal",
        pointWidth: 20,
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
        name: "Deaths",
        data: deathsHistory.slice(deathsHistory - 14),
      },
      {
        name: "Recovered",
        data: recoveredHistory.slice(recoveredHistory - 14),
      },
      {
        name: "Confirmed",
        data: casesHistory,
      },
    ],
  };
};

function BarChart({ detailHistory }) {
  const [options, setOptions] = useState({});
  useEffect(() => {
    setOptions(generateOptions(detailHistory));
  }, [detailHistory]);
  return (
    <div className="detail__bar-chart">
      <HighchartsReact highcharts={Highchart} options={options} />
    </div>
  );
}

export default BarChart;
