import React, { useEffect, useState } from "react";
import "./newslist.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Pagination, Typography, Skeleton } from "antd";
const { Title } = Typography;

function NewsList() {
  const { t } = useTranslation();
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getNewsList();
  }, [page]);

  const getNewsList = () => {
    axios(
      `https://corona--tracker.herokuapp.com/newslist?_page=${page}&_limit=5`
    )
      .then((res) => {
        setNewsList(res.data);
        setIsLocalLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const renderNewsItem = () => {
    if (!newsList) return null;
    return newsList.map((item, index) => (
      <div className="news-item" key={index}>
        <div className="news-item__img">
          <img src={item.urlToImage} alt={"img" + index} />
        </div>
        <div className="news-item__content">
          <p>
            <a href={item.url} rel="noreferrer" target="_blank">
              {item.title}
            </a>
          </p>
          <span>{item.description}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="news-list-container">
      <Title level={5} className="title">
        {t("NewsList.Title")}
      </Title>
      <div className="news-list">
        {isLocalLoading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            {renderNewsItem()}
            <Pagination
              defaultCurrent={1}
              total={50}
              onChange={(page) => setPage(page)}
              className="news-list__pagination"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default NewsList;
