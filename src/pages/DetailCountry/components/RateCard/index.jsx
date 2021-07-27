import React from "react";
import { useTranslation } from "react-i18next";

function RateCard({ detailCountry }) {
  const { t } = useTranslation();
  const { deathsPerOneMillion, recoveredPerOneMillion } = detailCountry;

  return (
    <div className="detail__rate-card">
      <div className="detail__rate-card__fatality">
        <p>{t("Detail.RateCard.FatalityRate")}</p>
        <span>{deathsPerOneMillion}</span>
        <p>{t("Detail.RateCard.Unit")}</p>
      </div>
      <div className="detail__rate-card__recovery">
        <p>{t("Detail.RateCard.RecoveryRate")}</p>
        <span>{recoveredPerOneMillion}</span>
        <p>{t("Detail.RateCard.Unit")}</p>
      </div>
    </div>
  );
}

export default RateCard;
