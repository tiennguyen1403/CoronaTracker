import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/news" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
