import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import "./news.scss";
import { GlobalActions } from "../../redux/rootAction";
import NewsCard from "./components/NewsCard";

function News() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.GlobalReducer.darkMode);
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
  });
  const [newsList, setNewsList] = useState([]);

  const getNewsList = () => {
    axios(
      `https://corona--tracker.herokuapp.com/newslist?_page=${pagination.page}&_limit=${pagination.limit}`
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

  useEffect(() => {
    getNewsList();
  }, [pagination]);
  return (
    <>
      {isLocalLoading ? (
        <div className="loader">
          <Skeleton className="skeleton" />
          <Skeleton className="skeleton" />
          <Skeleton className="skeleton" />
          <Skeleton className="skeleton" />
          <Skeleton className="skeleton" />
          <Skeleton className="skeleton" />
          <Skeleton className="skeleton" />
          <Skeleton className="skeleton" />
          <Skeleton className="skeleton" />
          <Skeleton className="skeleton" />
          <Skeleton className="skeleton" />
          <Skeleton className="skeleton" />
        </div>
      ) : (
        <div className={darkMode ? "dark-news-container" : "news-container"}>
          <div className="news">
            <div className="news__news-list">
              <InfiniteScroll
                dataLength={newsList.length}
                next={() =>
                  setPagination({ ...pagination, page: pagination.page + 1 })
                }
                hasMore={true}
                loader={<h4>Loading...</h4>}
                style={{ overflowY: "hidden" }}
              >
                {renderNewsCard()}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default News;
