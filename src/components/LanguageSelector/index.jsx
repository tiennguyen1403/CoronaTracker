import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

const { Option } = Select;

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("en");
  const handleChangeLanguage = (value) => {
    setSelectedLang(value);
    i18n.changeLanguage(value);
  };
  return (
    <Select
      defaultValue={selectedLang}
      style={{ width: 60 }}
      onChange={handleChangeLanguage}
    >
      <Option value="en">EN</Option>
      <Option value="vn">VI</Option>
    </Select>
  );
}

export default LanguageSelector;
