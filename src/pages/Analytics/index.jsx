import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./analytics.scss";
import { GlobalActions } from "../../redux/rootAction";
import InfoCard from "./components/InfoCard";
import InfoTable from "./components/InfoTable";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import Map from "./components/Map";

function Analytics() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [historyInfo, setHistoryInfo] = useState({});
  const [mapData, setMapData] = useState({});
  const countries = useSelector((state) => state.GlobalReducer.countries);
  const totalInfo = useSelector((state) => state.GlobalReducer.totalInfo);
  const darkMode = useSelector((state) => state.GlobalReducer.darkMode);

  useEffect(() => {
    getCountries();
    getTotalInfo();
    getMapData();
    getHistoryInfo();
  }, []);

  const getCountries = () => {
    axios("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        dispatch(GlobalActions.setCountries(res.data));
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((err) => console.log("countries: ", err.response));
  };
  const getTotalInfo = () => {
    axios("https://disease.sh/v3/covid-19/all")
      .then((res) => {
        dispatch(GlobalActions.setTotalInfo(res.data));
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((err) => console.log(err.response));
  };
  const getMapData = () => {
    import("@highcharts/map-collection/custom/world.geo.json").then((res) =>
      setMapData(res)
    );
  };
  const getHistoryInfo = () => {
    axios("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => {
        setHistoryInfo(res.data);
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div
      className={darkMode ? "dark-analytics-container" : "analytics-container"}
    >
      <div className="analytics">
        <h1>{t("Analytics.Title")}</h1>
        <InfoCard totalInfo={totalInfo} />
        <InfoTable countries={countries} />
        <LineChart historyInfo={historyInfo} />
        <BarChart countries={countries} />
        <Map mapData={mapData} countries={countries} />
      </div>
    </div>
  );
}

export default Analytics;
