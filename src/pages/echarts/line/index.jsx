import { Row, Col, Card } from "antd";
import { OnlyLine, MoreLine, StackLine, OtherLine } from "./components";
import "@/styles/echarts.less";

const Line = (props) => {
  return (
    <div className="bar-wrapper">
      <Row gutter={24} className="bar-list">
        <Col span={12}>
          <Card title="时间管理统计图" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <OnlyLine />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="气温统计图" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <MoreLine />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={24} className="bar-list">
        <Col span={12}>
          <Card title="LOL经济与伤害对比图" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <StackLine />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="LOL直播人气值" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <OtherLine />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Line;
