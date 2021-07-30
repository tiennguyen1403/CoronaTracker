import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import "./news.scss";
import { GlobalActions } from "../../redux/rootAction";
import NewsCard from "./components/NewsCard";
import Loader from "./components/Loader";

function News() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.GlobalReducer.darkMode);
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    getNewsList();
  }, [pageIndex]);

  const getNewsList = () => {
    axios(
      `https://corona--tracker.herokuapp.com/newslist?_page=${pageIndex}&_limit=12`
    )
      .then((res) => {
        setNewsList(newsList.concat(res.data));
        setIsLocalLoading(false);
        dispatch(GlobalActions.setIsLoading(false));
      })
      .catch((err) => {
        dispatch(GlobalActions.setIsLoading(false));
      });
  };
  const renderNewsCard = () => {
    return newsList.map((item, index) => {
      return <NewsCard key={index} newsInfo={item} />;
    });
  };

  return (
    <div className={darkMode ? "dark-news-container" : "news-container"}>
      {isLocalLoading ? (
        <Loader />
      ) : (
        <div className="news">
          <div className="news__news-list">
            <InfiniteScroll
              dataLength={newsList.length}
              next={() => setPageIndex(pageIndex + 1)}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              style={{ overflowY: "hidden" }}
            >
              {renderNewsCard()}
            </InfiniteScroll>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;
