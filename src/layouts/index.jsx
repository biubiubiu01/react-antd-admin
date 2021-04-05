import { Component } from "react";
import { connect } from "react-redux";
import "./style.less";
import { Layout } from "antd";
import SideBar from "./component/sideBar/index";
import NavBar from "./component/navBar/index";
import TagView from "./component/tagView/index";
import { updateUserInfo } from "@/store/modules/user";
import { setRoute } from "@/store/modules/permission";
import { getCache } from "@/utils/session";
import { getInfo } from "@/api/user";
import BoxShow from "@/components/BoxShow/index";
import BackTop from "@/components/BackTop/index";
import { SettingOutlined } from "@ant-design/icons";
import RouterView from "@/router/routerView";

class layouts extends Component {
  componentDidMount() {
    this.initApp();
  }

  //初始化app
  initApp = async () => {
    const token = getCache("TOKEN");
    if (!token) {
      this.props.history.push("/login");
      return;
    }
    const { data } = await getInfo({ token });
    if (data) {
      this.props.updateUserInfo(data);
      this.props.setRoute(data.username);
    }
  };

  render() {
    const { open, tagShow, fixHeader, route, mode } = this.props;
    return (
      <Layout className={`all-container ${open ? "closeSide" : ""}`}>
        <SideBar open={open} route={route} mode={mode} />
        <div className={`main-container ${tagShow ? "hasTag" : ""}`}>
          <div className={fixHeader ? "fixed-header" : ""}>
            <NavBar />
            <BoxShow show={tagShow}>
              <TagView />
            </BoxShow>
          </div>
          <div className="rightPanl fixed pointer">
            <SettingOutlined className="settingIcon" />
          </div>
          <div className="app-main">
            <RouterView route={route} />
            <BackTop />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { open, tagShow, fixHeader, mode } = state.setting;
  const { route } = state.permission;
  return { open, tagShow, fixHeader, route, mode };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (userInfo) => {
      dispatch(updateUserInfo(userInfo));
    },
    setRoute: (role) => {
      dispatch(setRoute(role));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(layouts);
