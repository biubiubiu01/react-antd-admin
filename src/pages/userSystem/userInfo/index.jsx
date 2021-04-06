import { Component } from "react";
import { Row, Col, Card, Divider, Input, Tag, Progress } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SvgIcon from "@/components/SvgIcon/index";
import BoxShow from "@/components/BoxShow/index";
import { PlusOutlined } from "@ant-design/icons";
import DynamicPage from "./components/dynamicPage/index";
import ArticlePage from "./components/articlePage/index";
import "./style.less";

class UserInfo extends Component {
  state = {
    addInputShow: false,
    tagList: [
      {
        title: "美食爱好者",
        color: "#1890FF",
      },
      {
        title: "学习",
        color: "#52C41A",
      },
      {
        title: "减肥",
        color: "#52C41A",
      },
      {
        title: "赚钱",
        color: "#1890FF",
      },
      {
        title: "进大厂",
        color: "#F5222D",
      },
    ],
    skillList: [
      {
        title: "React",
        value: 85,
        status: "active",
      },
      {
        title: "Ant design vue",
        value: 75,
        status: "active",
      },
      {
        title: "Echarts",
        value: 60,
        status: "active",
      },
      {
        title: "ESLint",
        value: 100,
        status: "success",
      },
      {
        title: "Node",
        value: 100,
        status: "exception",
      },
    ],
    tabList: [
      {
        key: "dynamicPage",
        tab: "动态",
      },
      {
        key: "articlePage",
        tab: "文章",
      },
    ],
    currentKey: "dynamicPage",
  };

  componentDidMount() {
    console.log(this.props);
  }

  inputConfirm = () => {
    let data = this.input.state.value || "";
    const value = data.trim();
    let tagList = this.state.tagList;
    if (
      value &&
      this.state.tagList.findIndex((item) => item.title == value) == -1
    ) {
      tagList = [...tagList, { title: value, color: "#1890FF" }];
    }

    this.setState({
      addInputShow: false,
      tagList: tagList,
    });
  };

  writeInput = () => {
    this.setState(
      {
        addInputShow: true,
      },
      () => {
        this.input.focus();
      }
    );
  };

  render() {
    const { userInfo } = this.props;
    const {
      addInputShow,
      tagList,
      skillList,
      tabList,
      currentKey,
    } = this.state;
    const userImg = require("../../../assets/nav/user.gif");
    return (
      <div className="userInfo-wrapper">
        <Row gutter={16}>
          <Col span={7}>
            <Card hoverable={true} bordered={false}>
              <div className="accountInfo">
                <img src={userImg.default} className="accountImg" />
                <div className="username">{userInfo.username}</div>
                <div className="userRole">{userInfo.role}</div>
              </div>
              <div className="accountMajor">
                {Object.keys(userInfo).map((item) => {
                  if (item != "username" && item != "role") {
                    return (
                      <div className="major-wrapper" key={item}>
                        <SvgIcon icon={item} className="vertical-bottom" />
                        <span className="major-name">{userInfo[item]}</span>
                      </div>
                    );
                  }
                })}
              </div>
              <Divider />
              <div className="tabList">
                <div style={{ margin: "10px 0" }}>标签</div>
                {tagList.map((item) => {
                  return (
                    <Tag
                      key={item.title}
                      style={{ marginBottom: "6px" }}
                      closable
                      color={item.color}
                    >
                      {item.title}
                    </Tag>
                  );
                })}
                <BoxShow show={addInputShow}>
                  <Input
                    ref={(input) => (this.input = input)}
                    type="text"
                    size="small"
                    style={{ width: "78px" }}
                    onBlur={this.inputConfirm}
                    onPressEnter={this.inputConfirm}
                  />
                </BoxShow>
                <BoxShow show={!addInputShow}>
                  <Tag className="pointer" onClick={this.writeInput}>
                    <PlusOutlined /> New Tag{" "}
                  </Tag>
                </BoxShow>
              </div>
              <Divider />
              <div className="skillList">
                <div style={{ margin: "10px 0" }}>技能</div>
                {skillList.map((item) => {
                  return (
                    <div key={item.title} className="skill-wrapper">
                      {item.title}
                      <Progress
                        size="small"
                        percent={item.value}
                        status={item.status}
                      />
                    </div>
                  );
                })}
              </div>
            </Card>
          </Col>
          <Col span={17}>
            <Card
              bordered={false}
              tabList={tabList}
              activeTabKey={currentKey}
              onTabChange={(key) => this.setState({ currentKey: key })}
            >
              <BoxShow show={currentKey == "dynamicPage"}>
                <DynamicPage />
              </BoxShow>
              <BoxShow show={currentKey == "articlePage"}>
                <ArticlePage />
              </BoxShow>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { userInfo } = state.user;
  return { userInfo };
};

export default withRouter(connect(mapStateToProps)(UserInfo));
