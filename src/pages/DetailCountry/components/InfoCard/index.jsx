import { Card, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import { formatNumber } from "../../../../helpers";
const { Text } = Typography;

function InfoCard({ detailCountry }) {
  const { t } = useTranslation();
  const {
    cases,
    recovered,
    deaths,
    todayCases,
    todayRecovered,
    todayDeaths,
    country,
    countryInfo,
  } = detailCountry;
  const { flag } = countryInfo;
  return (
    <div className="detail__info-card">
      <div className="detail__info-card__title">
        <img src={flag} alt="flag" />
        <span>{country + " " + t("Detail.InfoCard.Title")}</span>
      </div>
      <div className="card-group">
        <Card
          size="small"
          title={
            <Text className="infected-card__title">
              {t("Detail.InfoCard.Confirmed")}
            </Text>
          }
          className="infected-card"
        >
          <p>{formatNumber(cases)}</p>
          <p>+{formatNumber(todayCases)} new cases</p>
        </Card>
        <Card
          size="small"
          title={
            <Text className="recovered-card__title">
              {t("Detail.InfoCard.Recovered")}
            </Text>
          }
          className="recovered-card"
        >
          <p>{formatNumber(recovered)}</p>
          <p>+{formatNumber(todayRecovered)} new recovered</p>
        </Card>
        <Card
          size="small"
          title={
            <Text className="deaths-card__title">
              {t("Detail.InfoCard.Deaths")}
            </Text>
          }
          className="deaths-card"
        >
          <p>{formatNumber(deaths)}</p>
          <p>+{formatNumber(todayDeaths)} new deaths</p>
        </Card>
      </div>
    </div>
  );
}

export default InfoCard;
