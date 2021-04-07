import { Component } from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import RouterView from "./router/routerView";
import { HashRouter as Router } from "react-router-dom";
import { baseRoute } from "./router/route";

export default class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router>
          <RouterView route={baseRoute} />
        </Router>
      </ConfigProvider>
    );
  }
}
