import { Component } from "react";
import { Result, Button } from "antd";

export default class Error500 extends Component {
  render() {
    return (
      <Result
        className="error-page"
        status="500"
        title="500"
        subTitle="对不起，服务器出问题了"
        extra={
          <Button type="primary" onClick={() => this.props.history.goBack()}>
            返回上一页
          </Button>
        }
      ></Result>
    );
  }
}
