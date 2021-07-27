import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highchart from "highcharts";
import moment from "moment";

const generateOptions = (detailHistory) => {
  const categories = Object.keys(detailHistory.cases).map((item) =>
    moment(item).format("DD/MM/YY")
  );
  return {
    chart: {
      height: 500,
    },
    title: {
      text: "Daily Incidences Chart",
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
        data: Object.values(detailHistory.cases),
      },
      {
        name: "Recovered",
        data: Object.values(detailHistory.recovered),
      },
      {
        name: "Deaths",
        data: Object.values(detailHistory.deaths),
      },
    ],
  };
};

function LineChart({ detailHistory }) {
  const [options, setOptions] = useState({});
  useEffect(() => {
    setOptions(generateOptions(detailHistory));
  }, [detailHistory]);
  return (
    <div className="detail__line-chart">
      <HighchartsReact highcharts={Highchart} options={options} />
    </div>
  );
}

export default LineChart;
