import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, Card } from "antd";
import { Link } from "react-router-dom";

import CountrySelector from "../../../../components/CountrySelector";
import { formatNumber } from "../../../../helpers";
const { Title, Text } = Typography;

function InfoCard({ totalInfo, countries, history }) {
  const { t } = useTranslation();
  const { cases, recovered, deaths } = totalInfo;

  return (
    <div className="home__info-card">
      <Title level={5} className="title">
        {t("Home.InfoCard.Title")}
      </Title>
      <CountrySelector countries={countries} history={history} />
      <div className="card-group">
        <Card
          size="small"
          title={
            <Text className="infected-card__title">
              {t("Home.InfoCard.Confirmed")}
            </Text>
          }
          className="infected-card"
        >
          <p>{formatNumber(cases)}</p>
        </Card>
        <Card
          size="small"
          title={
            <Text className="recovered-card__title">
              {t("Home.InfoCard.Recovered")}
            </Text>
          }
          className="recovered-card"
        >
          <p>{formatNumber(recovered)}</p>
        </Card>
        <Card
          size="small"
          title={
            <Text className="deaths-card__title">
              {t("Home.InfoCard.Deaths")}
            </Text>
          }
          className="deaths-card"
        >
          <p>{formatNumber(deaths)}</p>
        </Card>
      </div>
      <Link to="/analytics">{t("Home.InfoCard.Detail")}</Link>
    </div>
  );
}

export default InfoCard;
