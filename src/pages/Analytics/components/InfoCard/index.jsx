import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, Card } from "antd";

import { formatNumber } from "../../../../helpers";
const { Text } = Typography;

function InfoCard({ totalInfo }) {
  const { t } = useTranslation();
  const { cases, recovered, deaths } = totalInfo;

  return (
    <div className="analytics__info-card">
      <div className="card-group">
        <Card
          size="small"
          title={
            <Text className="infected-card__title">
              {t("Analytics.InfoCard.Confirmed")}
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
              {t("Analytics.InfoCard.Recovered")}
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
              {t("Analytics.InfoCard.Deaths")}
            </Text>
          }
          className="deaths-card"
        >
          <p>{formatNumber(deaths)}</p>
        </Card>
      </div>
    </div>
  );
}

export default InfoCard;
