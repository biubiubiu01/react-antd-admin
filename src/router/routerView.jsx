import { Switch, Redirect, Route } from "react-router-dom";
import Error404 from "@/pages/error/404.jsx";
import { getCache } from "@/utils/session";

export default (props) => {
  const { route } = props;
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          const token = getCache("TOKEN");
          if (token) {
            return <Redirect to="/app/index" push />;
          }
          return <Redirect to="/login" push />;
        }}
      ></Route>
      {route.map((item) => {
        const Copm = item.component;
        return (
          <Route
            path={item.path}
            exact={item.exact}
            component={(childRoute) => {
              return <Copm routes={item.children} {...childRoute}></Copm>;
            }}
            key={item.path}
          ></Route>
        );
      })}
      <Route path="*" component={Error404}></Route>
    </Switch>
  );
};
