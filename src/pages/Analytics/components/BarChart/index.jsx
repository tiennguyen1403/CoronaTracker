import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highchart from "highcharts";

const generateOptions = (data) => {
  const categories = data.map((item) => item.country);
  return {
    chart: {
      height: 500,
      type: "bar",
    },
    title: {
      text: "Top countries with daily new cases",
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
    colors: ["#718096", "#F3585B"],
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
            return false;
          },
        },
        stacking: "normal",
        pointWidth: 20,
      },
    },
    series: [
      {
        name: "Daily New Deaths",
        data: data.map((item) => item.todayDeaths),
      },
      {
        name: "Daily New Cases",
        data: data.map((item) => item.todayCases),
      },
    ],
  };
};

function BarChart({ countries }) {
  const [topTodayCases, setTopTodayCases] = useState([]);
  const [options, setOptions] = useState({});

  const filterTopTodayCases = () => {
    if (!countries) return null;
    let topTodayCases = countries
      .slice()
      .sort((country1, country2) => country1.todayCases - country2.todayCases);
    topTodayCases.reverse();
    topTodayCases = topTodayCases.filter((country, index) => index < 10);
    setTopTodayCases(topTodayCases);
  };

  useEffect(() => {
    filterTopTodayCases();
  }, []);
  useEffect(() => {
    setOptions(generateOptions(topTodayCases));
  }, [topTodayCases]);

  return (
    <div className="analytics__bar-chart">
      <HighchartsReact highcharts={Highchart} options={options} />
    </div>
  );
}

export default BarChart;
