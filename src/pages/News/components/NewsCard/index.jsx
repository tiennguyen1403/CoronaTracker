import React from "react";
import { Card } from "antd";

function NewsCard({ newsInfo }) {
  const { title, description, urlToImage } = newsInfo;
  return (
    <Card className="news__news-item">
      <h4 className="news__news-item__title">{title}</h4>
      <p>
        <img src={urlToImage} alt="newsimg" align="left" />
        <span>{description}</span>
      </p>
    </Card>
  );
}

export default NewsCard;
