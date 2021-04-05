import { Component } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const { Item } = Breadcrumb;

export default class breadCrumb extends Component {
  state = {
    breadList: [
      {
        path: "/app/index",
        name: "首页",
      },
    ],
  };
  componentDidMount() {
    // this.getBreadCrumb();
  }

  // getBreadCrumb = () => {
  //   // let matched = this.$route.matched.filter(
  //   //   (item) => item.meta && item.meta.title
  //   // )
  //   // let home = {
  //   //   path: "/app/index",
  //   //   name: "首页",
  //   // };
  //   // if (matched[0].path == '/index') {
  //   //   this.breadList = [home]
  //   // } else {
  //   //   this.breadList = [home, ...matched]
  //   // }
  // }

  render() {
    return (
      <Breadcrumb
        className="flex-sub"
        separator="/"
        style={{ height: "100%", lineHeight: "54px", marginLeft: "3px" }}
      >
        {this.state.breadList.map((item, index) => {
          return (
            <Item key={item.path}>
              {index == 0 && this.state.breadList.length > 1 ? (
                <Link to={item.path}>{item.name}</Link>
              ) : (
                <span>{item.name}</span>
              )}
            </Item>
          );
        })}
      </Breadcrumb>
    );
  }
}
