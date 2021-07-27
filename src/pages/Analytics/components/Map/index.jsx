import React, { useEffect, useState } from "react";
import Highchart from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";

highchartsMap(Highchart);
const initOptions = {
  chart: {
    height: 500,
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.1, "#fff1f0"],
      [0.2, "#ffccc7"],
      [0.3, "#ffa39e"],
      [0.4, "#ff7875"],
      [0.5, "#ff4d4f"],
      [0.6, "#f5222d"],
      [0.7, "#cf1322"],
      [0.8, "#a8071a"],
      [0.9, "#820014"],
      [1, "#5c0011"],
    ],
  },
  legend: {
    layout: "horizontal",
    align: "right",
    verticalAlign: "bottom",
  },
  series: [
    {
      mapData: {},
      name: "Confirmed Cases",
      joinBy: ["hc-key", "key"],
    },
  ],
};

function Map({ mapData, countries }) {
  const [options, setOptions] = useState({});
  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      const data = mapData.features.map((feature, index) => {
        const country = countries.find(
          (country) => country.countryInfo.iso2 === feature.id
        );
        return {
          key: feature.properties["hc-key"],
          value: country?.cases || index,
        };
      });
      setOptions({
        ...initOptions,
        series: [
          {
            ...initOptions.series[0],
            mapData: mapData,
            data: data,
          },
        ],
      });
    }
  }, [mapData, countries]);
  return (
    <div className="analytics__map">
      <HighchartsReact
        highcharts={Highchart}
        options={options}
        constructorType="mapChart"
      />
    </div>
  );
}

export default Map;
