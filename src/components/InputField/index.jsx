import React from "react";
import { Input } from "antd";

function InputField(props) {
  const { field, type, placeholder } = props;
  return (
    <>
      {type === "password" ? (
        <Input.Password
          placeholder={placeholder}
          {...field}
          className="input-field"
        />
      ) : (
        <Input placeholder={placeholder} {...field} className="input-field" />
      )}
    </>
  );
}

export default InputField;
