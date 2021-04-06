import { Component } from "react";
import { Dropdown, Menu } from "antd";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import userImg from "@/assets/nav/user.gif";
import { removeCache } from "@/utils/session";
import { updateUserInfo, setToken } from "@/store/modules/user";

const { Item, Divider } = Menu;

class NavUser extends Component {
  logOut = () => {
    this.props.setToken(null);
    this.props.updateUserInfo({});
    removeCache("TOKEN");
    this.props.history.push("/login");
  };

  render() {
    const { userInfo } = this.props;
    const menuList = (
      <Menu>
        <Item key="user">
          <Link to="/app/userSystem/userInfo">个人中心</Link>
        </Item>
        <Item key="address">
          <Link to="/app/index">项目地址</Link>
        </Item>
        <Divider />
        <Item key="logout">
          <span onClick={this.logOut}>退出登录 </span>
        </Item>
      </Menu>
    );

    return (
      <Dropdown
        className="navUser-wrppaer right-menu-item pointer boxHover flex-sub"
        overlay={menuList}
      >
        <div>
          <img src={userImg} className="userImg" />
          <span className="userTitle">{userInfo.username} </span>
          <CaretDownOutlined style={{ marginLeft: "5px" }} />
        </div>
      </Dropdown>
    );
  }
}

const mapStateToProps = (state) => {
  const { userInfo } = state.user;
  return { userInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (userInfo) => {
      dispatch(updateUserInfo(userInfo));
    },
    setToken: (token) => {
      dispatch(setToken(token));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavUser)
);
