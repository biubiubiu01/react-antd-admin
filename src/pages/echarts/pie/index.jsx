import { Row, Col, Card } from "antd";
import { HolloPie, SolidPie, RadiusPie, AnnularPie } from "./components/index";
import "@/styles/echarts.less";

const pie = (props) => {
  return (
    <div className="bar-wrapper">
      <Row gutter={24} className="bar-list">
        <Col span={12}>
          <Card title="爱吃食物分类" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <HolloPie />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="技术占比" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <SolidPie />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={24} className="bar-list">
        <Col span={12}>
          <Card title="衣服开销" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <RadiusPie />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="环状图" hoverable={true} bordered={false}>
            <div className="chart-bar">
              <AnnularPie />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default pie;
