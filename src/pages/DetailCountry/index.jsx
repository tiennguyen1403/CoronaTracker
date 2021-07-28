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
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [detailHistory, setDetailHistory] = useState({});
  const countries = useSelector((state) => state.GlobalReducer.countries);
  const detailCountry = useSelector(
    (state) => state.GlobalReducer.detailCountry
  );
  const darkMode = useSelector((state) => state.GlobalReducer.darkMode);

  const getCountries = () => {
    axios("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        dispatch(GlobalActions.setCountries(res.data));
      })
      .catch((err) => console.log(err.response));
  };
  const getDetailCountry = () => {
    axios(`https://disease.sh/v3/covid-19/countries/${countrycode}`)
      .then((res) => {
        dispatch(GlobalActions.setDetailCountry(res.data));
      })
      .catch((err) => console.log(err.response));
  };
  const getDetailHistory = () => {
    axios(
      `https://disease.sh/v3/covid-19/historical/${countrycode}?lastdays=all`
    )
      .then((res) => {
        setDetailHistory(res.data.timeline);
        setIsLocalLoading(false);
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((err) => console.log(err.response));
  };
  const fetchData = async () => {
    try {
      await getCountries();
      await getDetailCountry();
      await getDetailHistory();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [countrycode]);
  return (
    <>
      {isLocalLoading ? (
        <div></div>
      ) : (
        <div
          className={darkMode ? "dark-detail-container" : "detail-container"}
        >
          <div className="detail">
            <CountrySelector countries={countries} history={history} />
            <InfoCard detailCountry={detailCountry} />
            <RateCard detailCountry={detailCountry} />
            <BarChart detailHistory={detailHistory} />
            <LineChart detailHistory={detailHistory} />
            <NewsList />
          </div>
        </div>
      )}
    </>
  );
}

export default DetailCountry;
