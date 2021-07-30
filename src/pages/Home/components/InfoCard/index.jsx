import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Card, Spin } from "antd";
import { Link } from "react-router-dom";

import CountrySelector from "../../../../components/CountrySelector";
import { formatNumber } from "../../../../helpers";
const { Title, Text } = Typography;

function InfoCard({ totalInfo, countries, history }) {
  const { t } = useTranslation();
  const { cases, recovered, deaths } = totalInfo;
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  useEffect(() => {
    if (totalInfo) setIsLocalLoading(false);
  }, []);

  return (
    <div className="home__info-card">
      <Title level={5} className="title">
        {t("Home.InfoCard.Title")}
      </Title>
      <CountrySelector countries={countries} history={history} />
      <div className="card-group">
        <Card
          size="small"
          title={<Text>{t("Home.InfoCard.Confirmed")}</Text>}
          className="infected-card"
        >
          {isLocalLoading ? <Spin /> : <p>{formatNumber(cases)}</p>}
        </Card>
        <Card
          size="small"
          title={<Text>{t("Home.InfoCard.Recovered")}</Text>}
          className="recovered-card"
        >
          {isLocalLoading ? <Spin /> : <p>{formatNumber(recovered)}</p>}
        </Card>
        <Card
          size="small"
          title={<Text>{t("Home.InfoCard.Deaths")}</Text>}
          className="deaths-card"
        >
          {isLocalLoading ? <Spin /> : <p>{formatNumber(deaths)}</p>}
        </Card>
      </div>
      <Link to="/analytics">{t("Home.InfoCard.Detail")}</Link>
    </div>
  );
}

export default InfoCard;
