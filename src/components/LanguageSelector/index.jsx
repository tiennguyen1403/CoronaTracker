import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

const { Option } = Select;

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const handleChangeLanguage = (value) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
  };
  return (
    <Select
      defaultValue={selectedLanguage}
      style={{ width: 60 }}
      onChange={handleChangeLanguage}
    >
      <Option value="en">EN</Option>
      <Option value="vn">VI</Option>
    </Select>
  );
}

export default LanguageSelector;
