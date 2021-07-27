import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./home.scss";
import { GlobalActions } from "../../redux/rootAction";
import Wrapper from "../../HOCs/Wrapper";
import InfoCard from "./components/InfoCard";
import InfoTable from "./components/InfoTable";
import NewsList from "../../components/NewsList";

function Home({ history }) {
  const dispatch = useDispatch();
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const countries = useSelector((state) => state.GlobalReducer.countries);
  const totalInfo = useSelector((state) => state.GlobalReducer.totalInfo);

  const getCountries = () => {
    axios("https://disease.sh/v3/covid-19/countries")
      .then((res) => {
        dispatch(GlobalActions.setCountries(res.data));
      })
      .catch((err) => console.log(err.response));
  };
  const getTotalInfo = () => {
    axios("https://disease.sh/v3/covid-19/all")
      .then((res) => {
        dispatch(GlobalActions.setTotalInfo(res.data));
        setIsLocalLoading(false);
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((err) => console.log(err.response));
  };
  const fetchData = async () => {
    try {
      await getCountries();
      await getTotalInfo();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLocalLoading ? (
        <div></div>
      ) : (
        <div className="home-container">
          <div className="home">
            <InfoCard
              countries={countries}
              totalInfo={totalInfo}
              history={history}
            />
            <InfoTable countries={countries} />
            <NewsList />
          </div>
        </div>
      )}
    </>
  );
}

export default Wrapper(Home);
