import React from "react";
import Header from "../components/Header";

function Wrapper(Component) {
  return (props) => (
    <>
      <Header />
      <Component {...props} />
    </>
  );
}

export default Wrapper;
