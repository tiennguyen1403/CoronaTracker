import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./detail.scss";
import CountrySelector from "../../components/CountrySelector";
import InfoCard from "./components/InfoCard";
import RateCard from "./components/RateCard";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import NewsList from "../../components/NewsList";
import { GlobalActions } from "../../redux/rootAction";

function DetailCountry({ history }) {
  const dispatch = useDispatch();
  const { countrycode } = useParams();
  const [detailHistory, setDetailHistory] = useState({});
  const countries = useSelector((state) => state.GlobalReducer.countries);
  const detailCountry = useSelector(
    (state) => state.GlobalReducer.detailCountry
  );
  const darkMode = useSelector((state) => state.GlobalReducer.darkMode);

  useEffect(() => {
    getCountries();
    getDetailCountry();
    getDetailHistory();
  }, [countrycode]);

  const getCountries = () => {
    axios("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        dispatch(GlobalActions.setCountries(res.data));
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((err) => {
        dispatch(GlobalActions.setIsLoading(false));
      });
  };
  const getDetailCountry = () => {
    axios(`https://disease.sh/v3/covid-19/countries/${countrycode}`)
      .then((res) => {
        dispatch(GlobalActions.setDetailCountry(res.data));
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((err) => {
        dispatch(GlobalActions.setIsLoading(false));
      });
  };
  const getDetailHistory = () => {
    axios(
      `https://disease.sh/v3/covid-19/historical/${countrycode}?lastdays=all`
    )
      .then((res) => {
        setDetailHistory(res.data.timeline);
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((err) => {
        dispatch(GlobalActions.setIsLoading(false));
      });
  };

  return (
    <div className={darkMode ? "dark-detail-container" : "detail-container"}>
      <div className="detail">
        <CountrySelector countries={countries} history={history} />
        <InfoCard detailCountry={detailCountry} />
        <RateCard detailCountry={detailCountry} />
        <BarChart detailHistory={detailHistory} />
        <LineChart detailHistory={detailHistory} />
        <NewsList />
      </div>
    </div>
  );
}

export default DetailCountry;
