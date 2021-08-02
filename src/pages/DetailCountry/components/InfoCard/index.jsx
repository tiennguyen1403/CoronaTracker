import React, { useState, useEffect } from "react";
import { Card, Typography, Spin } from "antd";
import { useTranslation } from "react-i18next";

import { formatNumber } from "../../../../helpers";
const { Text } = Typography;

function InfoCard({ detailCountry }) {
  const { t } = useTranslation();
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const {
    cases,
    recovered,
    deaths,
    todayCases,
    todayRecovered,
    todayDeaths,
    country,
    countryInfo,
    population,
  } = detailCountry;
  useEffect(() => {
    if (detailCountry) setIsLocalLoading(false);
  }, []);

  return (
    <div className="detail__info-card">
      <div className="detail__info-card__title">
        <img src={countryInfo?.flag} alt="flag" />
        <span>{country + " " + t("Detail.InfoCard.Title")}</span>
      </div>
      <p className="population">
        {t("Detail.InfoCard.Population")}:
        <span> {formatNumber(population)}</span>
      </p>
      <div className="card-group">
        <Card
          size="small"
          title={<Text>{t("Detail.InfoCard.Confirmed")}</Text>}
          className="infected-card"
        >
          {isLocalLoading ? (
            <Spin />
          ) : (
            <>
              <p>{formatNumber(cases)}</p>
              <p>
                +{formatNumber(todayCases)} {t("Detail.InfoCard.NewCases")}
              </p>
            </>
          )}
        </Card>
        <Card
          size="small"
          title={<Text>{t("Detail.InfoCard.Recovered")}</Text>}
          className="recovered-card"
        >
          {isLocalLoading ? (
            <Spin />
          ) : (
            <>
              <p>{formatNumber(recovered)}</p>
              <p>
                +{formatNumber(todayRecovered)} {t("Detail.InfoCard.NewCases")}
              </p>
            </>
          )}
        </Card>
        <Card
          size="small"
          title={<Text>{t("Detail.InfoCard.Deaths")}</Text>}
          className="deaths-card"
        >
          {isLocalLoading ? (
            <Spin />
          ) : (
            <>
              <p>{formatNumber(deaths)}</p>
              <p>
                +{formatNumber(todayDeaths)} {t("Detail.InfoCard.NewCases")}
              </p>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default InfoCard;
