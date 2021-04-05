import { Component } from "react";
import { Menu } from "antd";
import Logo from "./logo";
import "./sideBar.less";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import SvgIcon from "@/components/SvgIcon/index";

const { Item, SubMenu } = Menu;

class sideBar extends Component {
  static propTypes = {
    open: PropTypes.bool,
    route: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
  };

  state = {
    openKeys: [],
  };

  componentDidMount() {
    this.setState({
      openKeys: [this.props.location.pathname],
    });
  }

  //二级展开关闭回调
  changeOpen = (keys) => {
    const currentOpenKey = keys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    );
    const children = this.props.route.filter((item) => item.children);
    let tempKey = [];
    if (
      children[0].children.findIndex((item) => item.path == currentOpenKey) ===
      -1
    ) {
      tempKey = keys;
    } else {
      tempKey = currentOpenKey ? [currentOpenKey] : [];
    }
    this.setState({
      openKeys: tempKey,
    });
  };

  //获取路由
  getRoute(data = []) {
    return data.map((item) => {
      if (!item.children && !item.hidden) {
        return (
          <Item key={item.path}>
            <Link to={item.path} style={{ width: "100%", height: "100%" }}>
              {item.meta.icon ? (
                <SvgIcon
                  icon={item.meta.icon}
                  color="rgba(255,255,255,0.65)"
                  className="menuIcon"
                />
              ) : (
                ""
              )}
              <span className="menu-title">{item.meta.title}</span>
            </Link>
          </Item>
        );
      } else {
        return (
          <SubMenu
            key={item.path}
            title={this.props.open ? "" : item.meta.title}
            icon={
              item.meta.icon ? (
                <SvgIcon
                  icon={item.meta.icon}
                  color="rgba(255,255,255,0.65)"
                  className="menuIcon"
                />
              ) : (
                ""
              )
            }
          >
            {this.getRoute(item.children)}
          </SubMenu>
        );
      }
    });
  }

  render() {
    const { open, route, mode } = this.props;
    return (
      <div className="side-wrapper aside-container">
        <Logo collapse={open} />
        <div className="side-main scrollCss">
          {mode == "inline" ? (
            <Menu
              mode="inline"
              inlineCollapsed={open}
              theme="dark"
              selectedKeys={[this.props.location.pathname]}
              openKeys={this.state.openKeys}
              onOpenChange={this.changeOpen}
            >
              {this.getRoute(route)}
            </Menu>
          ) : (
            <Menu
              mode="horizontal"
              theme="dark"
              selectedKeys={[this.props.location.pathname]}
              openKeys={this.state.openKeys}
              onOpenChange={this.changeOpen}
            >
              {this.getRoute(route)}
            </Menu>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(sideBar);
