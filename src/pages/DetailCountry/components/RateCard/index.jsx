import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";

function RateCard({ detailCountry }) {
  const { t } = useTranslation();
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const { deathsPerOneMillion, recoveredPerOneMillion } = detailCountry;
  useEffect(() => {
    if (detailCountry) setIsLocalLoading(false);
  }, []);
  return (
    <div className="detail__rate-card">
      <div className="detail__rate-card__fatality">
        <p>{t("Detail.RateCard.FatalityRate")}</p>
        {isLocalLoading ? <Spin /> : <span>{deathsPerOneMillion}</span>}
        <p>{t("Detail.RateCard.Unit")}</p>
      </div>
      <div className="detail__rate-card__recovery">
        <p>{t("Detail.RateCard.RecoveryRate")}</p>
        {isLocalLoading ? <Spin /> : <span>{recoveredPerOneMillion}</span>}
        <p>{t("Detail.RateCard.Unit")}</p>
      </div>
    </div>
  );
}

export default RateCard;
