import React from "react";
import { Select } from "antd";
const { Option } = Select;

function CountrySelector({ countries, history }) {
  const onChange = (value) => {
    value = value.toLowerCase();
    if (history) {
      history.push(`/country/${value}`);
    }
  };
  const renderCountryOption = () => {
    if (!countries) return null;
    return countries.map((country, index) => {
      return (
        <Option key={index} value={country.countryInfo.iso2}>
          {country.country}
        </Option>
      );
    });
  };
  return (
    <div className="country-selector">
      <Select
        size="large"
        showSearch
        className="select"
        placeholder="Select a country"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {renderCountryOption()}
      </Select>
    </div>
  );
}

export default CountrySelector;
