import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, Table } from "antd";

const { Title } = Typography;
const columns = [
  {
    title: "Country",
    dataIndex: "country",
    render: ({ imgUrl, countryName }) => (
      <>
        <img src={imgUrl} alt="img" style={{ width: 20, marginRight: 5 }} />
        {countryName}
      </>
    ),
    width: 150,
    fixed: "left",
  },
  {
    title: "Confirmed",
    dataIndex: "confirmed",
    sorter: {
      compare: (a, b) => a.confirmed - b.confirmed,
      multiple: 3,
    },
  },
  {
    title: "Recovered",
    dataIndex: "recovered",
    sorter: {
      compare: (a, b) => a.recovered - b.recovered,
      multiple: 2,
    },
  },
  {
    title: "Deaths",
    dataIndex: "deaths",
    sorter: {
      compare: (a, b) => a.deaths - b.deaths,
      multiple: 1,
    },
  },
];

function InfoTable({ countries }) {
  const { t } = useTranslation();
  let data = countries.map((country, index) => {
    return {
      key: index + 1,
      country: {
        imgUrl: country.countryInfo.flag,
        countryName: country.country,
      },
      confirmed: country.cases,
      recovered: country.recovered,
      deaths: country.deaths,
    };
  });

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="home__info-table">
      <Title level={5} className="title">
        {t("Home.InfoTable.Title")}
      </Title>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        className="table"
      />
    </div>
  );
}

export default InfoTable;