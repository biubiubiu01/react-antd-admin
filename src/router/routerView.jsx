import { Switch, Redirect, Route } from "react-router-dom";
import Error404 from "@/pages/error/404.jsx";
import { getCache } from "@/utils/session";

const routerView = (props) => {
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
        const Component = item.component;
        return (
          <Route
            key={item.path}
            path={item.path}
            exact={item.exact}
            render={(props) => {
              return (
                <Component {...props} routes={item.children || []}></Component>
              );
            }}
          ></Route>
        );
      })}
      <Route path="*" component={Error404}></Route>
    </Switch>
  );
};

export default routerView;
