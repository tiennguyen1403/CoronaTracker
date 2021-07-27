import React from "react";
import { useSelector } from "react-redux";

import "./globalLoading.scss";

function GlobalLoading() {
  const isLoading = useSelector((state) => state.GlobalReducer.isLoading);

  if (isLoading) {
    return (
      <div className="container">
        <div className="globalLoading">
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </div>
    );
  }
  return null;
}

export default GlobalLoading;
