import { Component } from "react";
import { Result, Button } from "antd";

export default class Error404 extends Component {
  render() {
    return (
      <Result
        className="error-page"
        status="404"
        title="404"
        subTitle="对不起，你访问的页面不存在"
        extra={
          <Button type="primary" onClick={() => this.props.history.goBack()}>
            返回上一页
          </Button>
        }
      ></Result>
    );
  }
}
