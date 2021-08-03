import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Typography, Card, Spin } from "antd";

import { formatNumber } from "../../../../helpers";
const { Text } = Typography;

function InfoCard({ totalInfo }) {
  const { t } = useTranslation();
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const { cases, recovered, deaths } = totalInfo;

  useEffect(() => {
    if (totalInfo) setIsLocalLoading(false);
  }, []);

  return (
    <div className="analytics__info-card">
      <div className="card-group">
        <Card
          size="small"
          title={<Text>{t("Analytics.InfoCard.Confirmed")}</Text>}
          className="infected-card"
        >
          {isLocalLoading ? <Spin /> : <p>{formatNumber(cases)}</p>}
        </Card>
        <Card
          size="small"
          title={<Text>{t("Analytics.InfoCard.Recovered")}</Text>}
          className="recovered-card"
        >
          {isLocalLoading ? <Spin /> : <p>{formatNumber(recovered)}</p>}
        </Card>
        <Card
          size="small"
          title={<Text>{t("Analytics.InfoCard.Deaths")}</Text>}
          className="deaths-card"
        >
          {isLocalLoading ? <Spin /> : <p>{formatNumber(deaths)}</p>}
        </Card>
      </div>
    </div>
  );
}

export default InfoCard;
